import {
    Client,
    Intents
} from 'discord.js';
import { default as config } from './config.json';

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

client.on('messageCreate', async message => {});

client.login(config.token);
