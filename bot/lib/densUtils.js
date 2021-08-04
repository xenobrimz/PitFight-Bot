import {
    densAPI,
    monstersAPI
} from './api.js';

export async function initializeDen(id) {
    let monsters = [];

    for (let i = 0; i < 10; i++) {
        monsters[i] = monstersAPI.create('name', 100, 100, [
            {
                skillNumber: 1,
                name: 'skill 1',
                damage: 10,
                type: 'type 1'
            },
            {
                skillNumber: 2,
                name: 'skill 2',
                damage: 20,
                type: 'type 2'
            },
            {
                skillNumber: 3,
                name: 'skill 3',
                damage: 30,
                type: 'type 3'
            }
        ]);
    }

    monsters = await Promise.all(monsters);

    densAPI.create(id, monsters);
}