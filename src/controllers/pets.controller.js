import PetDTO from "../dto/Pet.dto.js";
import { PetServices } from "../services/pet.services.js";
import __dirname from "../utils/index.js";

export class PetController {
    constructor() {
        this.PetServices = new PetServices()
    }

    getAllPets = async (req, res) => {
        const pets = await this.PetServices.getAll();
        res.status(200).json(pets); 
    }
    
    createPet = async (req, res) => {
        const { name, specie, birthDate } = req.body;
        if (!name || !specie || !birthDate) {
            return res.status(400).json({ error: "Datos incompletos. Ingrese los datos faltantes" });
        }
        const pet = PetDTO.getPetInputFrom({ name, specie, birthDate });
        const result = await this.PetServices.create(pet);
        res.status(201).json(result);
    }
    
    updatePet = async (req, res) => {
        const petUpdateBody = req.body;
        const petId = req.params.pid;
        const result = await this.PetServices.update(petId, petUpdateBody);
        res.status(200).json({ message: "Mascota actualizada correctamente", payload: result });
    }
    
    deletePet = async (req, res) => {
        const petId = req.params.pid;
        await this.PetServices.remove(petId);
        res.status(200).json({ message: "Mascota eliminada correctamente" });
    }
    
    createPetWithImage = async (req, res) => {
        const file = req.file;
        const { name, specie, birthDate } = req.body;
        if (!name || !specie || !birthDate) {
            return res.status(400).json({ error: "Datos incompletos. Ingrese los datos faltantes" });
        }
        const pet = PetDTO.getPetInputFrom({
            name,
            specie,
            birthDate,
            image: `${__dirname}/../public/img/${file.filename}`
        });
        const result = await this.PetServices.create(pet);
        res.status(201).json(result);
    }

    createPetsMock = async (req, res) => {
        const pets = await this.PetServices.createMocks(100);
        res.status(201).json(pets);
    }
}


