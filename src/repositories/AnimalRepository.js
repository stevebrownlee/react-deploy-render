import Settings from "./Settings"

export default {
    async get(id) {
        const e = await fetch(`${Settings.remoteURL}/animalia/${id}`)
        return await e.json()
    },
    async searchByName(query) {
        const e = await fetch(`${Settings.remoteURL}/animals?_expand=employee&_sort=employee.id&_embed=treatments&_expand=location&name_like=${query}`)
        return await e.json()
    },
    async delete(id) {
        const e = await fetch(`${Settings.remoteURL}/animals/${id}`, {
            "method": "DELETE"
        })
        return await e.json()
    },
    async getAll() {
        const e = await fetch(`${Settings.remoteURL}/animalia`)
        return await e.json()
    },
    async addAnimal(newAnimal) {
        const data = await fetch(`${Settings.remoteURL}/animals`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newAnimal)
        })
        return await data.json()
    },
    async updateAnimal(editedAnimal) {
        const data = await fetch(`${Settings.remoteURL}/animals/${editedAnimal.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedAnimal)
        })
        return await data.json()
    }
}
