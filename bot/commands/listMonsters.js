import {
    monstersAPI,
    densAPI
} from '../lib/api.js';
import { default as config } from '../config.json';

const list = config.list;

export default {
    names: list.names,
    description: list.description,
    argsRequired: false,
    argsOptional: false,
    noSpecialChars: false,
    guildOnly: true,
    usage: '',
    cooldown: 0,
    async execute(msg, args) {
        const den = await densAPI.get(msg.guild.id);

        let embed = {
            embeds: [{
                title: 'This server\'s den',
                thumbnail: { url: config.icon },
                color: parseInt('fff000', 16),
                fields: []
            }]
        };

        for (let i = 0; i < den.monsters.length; i++) {
            const monster = await monstersAPI.get(den.monsters[i]);
            const stats = `Health:${monster.health}\nDefense:${monster.defense}\nWins:${monster.wins}\nLosses:${monster.losses}`;

            embed.embeds[0].fields.push(
                {
                    name: monster.name,
                    value: stats
                }
            );
        }

        msg.channel.send(embed);
    }
}