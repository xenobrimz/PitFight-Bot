import {
    Client,
    Intents
} from 'discord.js';
import { default as config } from './config.json';
import { initialize as initializeHelp } from './commands/help.js';
import { removeAllSpecialChars } from './lib/stringUtils.js';
import { readdirSync } from 'fs';
import { densAPI } from './lib/api.js';
import { initializeDen } from './lib/densUtils.js';

//--------------------------------------------------------------------------------

const client = new Client({
    retryLimit: Infinity,

    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,

        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS
    ],

    // to work in DM's on startup
    partials: ['CHANNEL']
});

//--------------------------------------------------------------------------------
// client variables

const minimumPermissions = ['SEND_MESSAGES'];
const cooldowns = new Map();
client.commands = new Map();
let commands = [];

//--------------------------------------------------------------------------------
// load commands

const commandFiles = readdirSync('./commands/').filter(aFile => aFile.endsWith('.js'));

commands = commandFiles.map(f => import(`./commands/${f}`));

commands = (await Promise.all(commands)).map(i => i.default);

for (let i = 0, n = commands.length; i < n; i++) {
    const command = commands[i];

    for (let j = 0, m = command.names.length; j < m; j++) {
        client.commands.set(command.names[j], command);
    }
}

//--------------------------------------------------------------------------------
// initialize help embeds

initializeHelp(commands);

//--------------------------------------------------------------------------------
// login actions

client.on('ready', () => {
    //--------------------------------------------------------------------------------
    // set activity

    client.user.setActivity(config.activityStatus, { type: 'PLAYING' });

    //--------------------------------------------------------------------------------
    // console log the start up time

    console.log(`Startup: ${client.readyAt.toString()}`);
});

//--------------------------------------------------------------------------------
// process messages

client.on('messageCreate', async msg => {
    // filter messages
    if (msg.author.bot || !msg.content.length) {
        return;
    }

    const isDM = msg.channel.type === 'DM';

    // permissions
    if (!isDM) {
        const guildMemberClient = msg.guild.me;

        // must be admin or have minimum perms
        if (!guildMemberClient.permissions.has('ADMINISTRATOR') && !guildMemberClient.permissions.has(minimumPermissions)) {
            return;
        }
    }

    //--------------------------------------------------------------------------------
    // commands

    const msgStr = msg.content;

    if (!msgStr.startsWith(config.prefix)) {
        return;
    }

    // split command and arguments

    // discord trims the original message so only a left trim is needed
    let args = msgStr.slice(config.prefix.length).trimStart().split(' ');
    const userCommand = args.shift().toLowerCase();

    //--------------------------------------------------------------------------------
    // get command

    const command = client.commands.get(userCommand);

    if (typeof command === 'undefined') {
        return;
    }

    if (command.guildOnly && isDM) {
        msg.channel.send('I can\'t execute that command in DM\'s');
        return;
    }

    if (command.noSpecialChars) {
        const argStr = removeAllSpecialChars(args.join(' '));

        if (argStr.length) {
            args = argStr.split(' ');
        }
        else {
            args = [];
        }
    }

    if (command.argsRequired && !args.length) {
        msg.channel.send(`Please provide arguments\nex: \`${config.prefix}${command.names[0]} ${command.usage}\``);
        return;
    }

    //--------------------------------------------------------------------------------
    // cooldown

    if (!cooldowns.has(command.names[0])) {
        cooldowns.set(command.names[0], new Map());
    }

    const timestamps = cooldowns.get(command.names[0]);
    const cooldownAmount = command.cooldown * 1000;
    const now = Date.now();

    if (timestamps.has(msg.author.id)) {
        const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            msg.channel.send(`Please let me cooldown for ${timeLeft.toFixed(1)} second(s)`);
            return;
        }
    }

    timestamps.set(msg.author.id, now);
    setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);

    //--------------------------------------------------------------------------------
    // execute command

    try {
        await command.execute(msg, args);
    }
    catch (error) {
        msg.channel.send('Command execution failed');
        console.log(error);
    }
});

//--------------------------------------------------------------------------------
// guild join

client.on('guildCreate', guild => {
    initializeDen(guild.id);
});

//--------------------------------------------------------------------------------
// guild leave

client.on('guildDelete', guild => {
    densAPI.delete(guild.id);
});

//--------------------------------------------------------------------------------
// disconnect

client.on('shardDisconnect', () => console.log(`Disconnected: ${new Date().toString()}`));

//--------------------------------------------------------------------------------
// reconnect

client.on('shardResume', () => {
    // set activity

    client.user.setActivity(config.activityStatus, { type: 'PLAYING' });

    //--------------------------------------------------------------------------------
    // console log the start up time

    console.log(`Reconnected: ${new Date().toString()}`);
});

client.login(config.token);
