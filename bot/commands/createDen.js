import { initializeDen } from '../lib/densUtils.js';
import { default as config } from '../config.json';

const create = config.createDen;

export default {
    names: create.names,
    description: create.description,
    argsRequired: false,
    argsOptional: false,
    noSpecialChars: false,
    guildOnly: true,
    usage: '',
    cooldown: 0,
    async execute(msg, args) {
        initializeDen(msg.guild.id);

        msg.channel.send('Den created');
    }
}