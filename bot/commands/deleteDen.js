import { densAPI } from '../lib/api.js';
import { default as config } from '../config.json';

const deleteConfig = config.deleteDen;

export default {
    names: deleteConfig.names,
    description: deleteConfig.description,
    argsRequired: false,
    argsOptional: false,
    noSpecialChars: false,
    guildOnly: true,
    usage: '',
    cooldown: 0,
    async execute(msg, args) {
        densAPI.delete(msg.guild.id);

        msg.channel.send('Den deleted');
    }
}