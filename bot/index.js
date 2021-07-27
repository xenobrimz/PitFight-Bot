import {
    Client,
    Intents
} from 'discord.js';
import { default as config } from './config.json';
import { initialize as initializeHelp } from './commands/help.js';
import { removeAllSpecialChars } from './lib/stringUtils.js';

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
client.commands = [];

//--------------------------------------------------------------------------------
// load commands

const commandFiles = readdirSync('./commands/').filter(aFile => aFile.endsWith('.js'));

for (let i = 0, n = commandFiles.length; i < n; i++) {
    client.commands[i] = (await import(`./commands/${commandFiles[i]}`)).default;
}

//--------------------------------------------------------------------------------
// initialize help embeds

initializeHelp(client.commands);

//--------------------------------------------------------------------------------
// login actions

client.on('ready', () => {
    //--------------------------------------------------------------------------------
    // set activity

    client.user.setActivity(config.activityStatus, { type: 'PLAYING' });

    //--------------------------------------------------------------------------------
    // console log the start up time

    console.log(`Ready ${client.readyAt.toString()}`);
});

//--------------------------------------------------------------------------------

client.on('messageCreate', msg => {
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

    const msgStr = msg.content.toLowerCase();

    if (msgStr.startsWith(config.prefix)) {
        return;
    }

    // split command and arguments

    let args = msgStr.slice(config.prefix.length).trim().split(' ');
    const userCommand = args.shift();

    //--------------------------------------------------------------------------------
    // get command

    const command = client.commands.find(cmd => cmd.names.includes(userCommand));

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
        command.execute(msg, args);
    }
    catch (error) {
        msg.channel.send('Command execution failed');
        console.log(error);
    }
});

//--------------------------------------------------------------------------------
// disconnect

client.on('shardDisconnect', () => console.log(`Disconnected ${new Date().toString()}`));

//--------------------------------------------------------------------------------
// reconnect

client.on('shardResume', () => {
    // set activity

    client.user.setActivity(config.activityStatus, { type: 'PLAYING' });

    //--------------------------------------------------------------------------------
    // console log the start up time

    console.log(`Reconnected ${client.readyAt.toString()}`);
});

client.login(config.token);
