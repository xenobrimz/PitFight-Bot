import {
    densAPI,
    monstersAPI,
    namesAPI
} from './api.js';

/**
 * for testing
 * 
 * @param {*} id 
 */
export async function initializeDen(id) {
    let names = testingNames();

    for (let i = 0; i < 10; i++) {
        names[i] = namesAPI.create(names[i]);
    }

    names = await Promise.all(names);

    //---------------------------------

    let monsters = [];

    for (let i = 0; i < 10; i++) {
        const name = names[i];

        monsters[i] = monstersAPI.create(`${name.names.monsterNames.first[0]} ${name.names.monsterNames.middle[0]} ${name.names.monsterNames.last[0]}`, 100, 100, [
            {
                skillNumber: 1,
                name: name.names.skillNames[0],
                damage: 10,
                type: 'type 1'
            },
            {
                skillNumber: 2,
                name: name.names.skillNames[1],
                damage: 20,
                type: 'type 2'
            },
            {
                skillNumber: 3,
                name: name.names.skillNames[2],
                damage: 30,
                type: 'type 3'
            }
        ]);
    }

    monsters = await Promise.all(monsters);

    densAPI.create(id, monsters);
}

/**
 * for testing
 * 
 * @returns 
 */
function testingNames() {
    let names = [];

    for (let i = 0; i < 10; i++) {
        let name = {
            names:{
                monsterNames:{
                    first:[
                    ],
                    middle:[
                    ],
                    last:[
                    ]
                },
                skillNames:[
                ]
            }
        };

        name.names.monsterNames.first[0] = `first${i}`;
        name.names.monsterNames.middle[0] = `middle${i}`;
        name.names.monsterNames.last[0] = `last${i}`;

        name.names.skillNames[0] = `skill1 (${i})`;
        name.names.skillNames[1] = `skill2 (${i})`;
        name.names.skillNames[2] = `skill3 (${i})`;

        names[i] = name;
    }

    return names;
}
