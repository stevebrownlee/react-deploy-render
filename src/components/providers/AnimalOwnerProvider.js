import React, { useState, useEffect } from 'react'
import AnimalOwnerRepository from "../../repositories/AnimalOwnerRepository"


// The context is imported and used by individual components that need data
export const AnimalOwnerContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const AnimalOwnerProvider = props => {
    const [animalOwners, setAnimalOwners] = useState([]);

    const getAnimalOwners = id =>
        AnimalOwnerRepository.get(`?_expand=owner&_expand=animal&animalId=${id}`)

    const changeOwner = (animalId, ownerId) => {
        AnimalOwnerRepository.assignOwner(animalId, ownerId)
            .then(AnimalOwnerRepository.getAll)
            .then(setAnimalOwners)
    }

    const removeOwnerRelationship = id => {
        return AnimalOwnerRepository.getOwnersByAnimal(id)
            .then(rels => {
                rels.forEach(r => AnimalOwnerRepository.delete(r.id))
            })
    }

    /*
        Load all animalOwners when the component is mounted. Ensure that
        an empty array is the second argument to avoid infinite loop.
    */
    useEffect(() => {
        AnimalOwnerRepository.getAll().then(setAnimalOwners)
    }, [])

    return (
        <AnimalOwnerContext.Provider value={{
            animalOwners,
            changeOwner,
            removeOwnerRelationship,
            getAnimalOwners
        }}>
            {props.children}
        </AnimalOwnerContext.Provider>
    )
}
