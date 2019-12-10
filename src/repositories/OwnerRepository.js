import Settings from "./Settings"

export default {
    async get(id) {
        const e = await fetch(`${Settings.remoteURL}/users/${id}`)
        return await e.json()
    },
    async createAccount(user) {
        const data = await fetch(`${Settings.remoteURL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        return await data.json()
    },
    async findUser(un, pwd) {
        const data = await fetch(`${Settings.remoteURL}/users?email=${un}&password=${pwd}`)
        return await data.json()
    },
    async delete(id) {
        const e = await fetch(`${Settings.remoteURL}/users/${id}`, {
            method: "DELETE"
        })
        return await e.json()
    },
    async getAll() {
        const e = await fetch(`${Settings.remoteURL}/users`)
        return await e.json()
    }
}