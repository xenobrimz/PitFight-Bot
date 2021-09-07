import axios from 'axios';

const apiURL = 'http://localhost:8000/api/';

//--------------------

const densURL = `${apiURL}dens/`;
export const densAPI = {
    /**
     * 
     * @returns array of den objects
     */
    async getAll() {
        return (await axios.get(densURL)).data.results;
    },

    /**
     * 
     * @param {*} id string
     * @returns den object
     */
    async get(id) {
        return (await axios.get(`${densURL}${id}`)).data.result;
    },

    /**
     * 
     * @param {*} id string
     * @param {*} monsters array of monster objects
     * @returns den object
     */
    async create(id, monsters) {
        return (await axios.post(`${densURL}create/`, {
            _id: id,
            monsters: monsters
        })).data.result;
    },

    /**
     * 
     * @param {*} id string
     * @param {*} monsters array of monster objects
     * @returns den object
     */
    async update(id, monsters) {
        return (await axios.patch(`${densURL}${id}/update/`, {
            _id: id,
            monsters: monsters
        })).data.result;
    },

    /**
     * 
     * @param {*} id string
     * @returns delete information object
     */
    async delete(id) {
        return (await axios.delete(`${densURL}${id}/delete/`)).data.result;
    }
};

//--------------------

const monstersURL = `${apiURL}monsters/`;
export const monstersAPI = {
    /**
     * 
     * @returns array of monster objects
     */
    async getAll() {
        return (await axios.get(monstersURL)).data.results;
    },

    /**
     * 
     * @param {*} id string
     * @returns monster object
     */
    async get(id) {
        return (await axios.get(`${monstersURL}${id}`)).data.result;
    },

    /**
     * 
     * @param {*} name string
     * @param {*} health number
     * @param {*} defense number
     * @param {*} skills array of skill objects
     * @returns monster object
     */
    async create(name, health, defense, skills) {
        return (await axios.post(`${monstersURL}create/`, {
            name: name,
            health: health,
            defense: defense,
            skills: skills,
            wins: 0,
            losses: 0
        })).data.result;
    },

    /**
     * 
     * @param {*} id string
     * @param {*} name string
     * @param {*} health number
     * @param {*} defense number
     * @param {*} skills array of skill objects
     * @param {*} wins number
     * @param {*} losses number
     * @returns 
     */
    async update(id, name, health, defense, skills, wins, losses) {
        return (await axios.patch(`${monstersURL}${id}/update/`, {
            name: name,
            health: health,
            defense: defense,
            skills: skills,
            wins: wins,
            losses: losses
        })).data.result;
    },

    /**
     * 
     * @param {*} id string
     * @returns delete information object
     */
    async delete(id) {
        return (await axios.delete(`${monstersURL}${id}/delete/`)).data.result;
    }
};

//--------------------

const usersURL = `${apiURL}users/`;
export const usersAPI = {
    /**
     * 
     * @returns array of user objects
     */
    async getAll() {
        return (await axios.get(usersURL)).data.results;
    },

    /**
     * 
     * @param {*} id string
     * @returns user object
     */
    async get(id) {
        return (await axios.get(`${usersURL}${id}`)).data.result;
    },

    /**
     * 
     * @param {*} id string
     * @param {*} coins number
     * @returns user object
     */
    async create(id, coins) {
        return (await axios.post(`${usersURL}create/`, {
            _id: id,
            coins: coins
        })).data.result;
    },

    /**
     * 
     * @param {*} id string
     * @param {*} coins number
     * @returns user object
     */
    async update(id, coins) {
        return (await axios.patch(`${usersURL}${id}/update/`, {
            _id: id,
            coins: coins
        })).data.result;
    },

    /**
     * 
     * @param {*} id string
     * @returns delete information object
     */
    async delete(id) {
        return (await axios.delete(`${usersURL}${id}/delete/`)).data.result;
    }
};

//--------------------

const namesURL = `${apiURL}names/`;
export const namesAPI = {
    /**
     * 
     * @returns array of name objects
     */
    async getAll() {
        return (await axios.get(namesURL)).data.results;
    },

    /**
     * 
     * @param {*} id 
     * @returns name object
     */
    async get(id) {
        return (await axios.get(`${namesURL}${id}`)).data.result;
    },

    /**
     * 
     * @param {*} nameObj 
     * @returns name object
     */
    async create(nameObj) {
        return (await axios.post(`${namesURL}create/`, nameObj)).data.result;
    },

    /**
     * 
     * @param {*} id 
     * @param {*} nameObj 
     * @returns name object
     */
    async update(id, nameObj) {
        return (await axios.patch(`${namesURL}${id}/update/`, nameObj)).data.result;
    },

    /**
     * 
     * @param {*} id 
     * @returns delete name object
     */
    async delete(id) {
        return (await axios.delete(`${namesURL}${id}/delete/`)).data.result;
    }
};
