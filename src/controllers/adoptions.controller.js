import { AdoptionServices } from "../services/adoption.services.js";

export class AdoptionController {
    constructor() {
        this.AdoptionServices = new AdoptionServices();
    }

    getAllAdoptions = async (req, res) => {
        const adoptions = await this.AdoptionServices.getAll();
        res.status(200).json(adoptions);
    }

    createAdoption = async (req, res) => {
        const adoptionData = req.body;
        const result = await this.AdoptionServices.create(adoptionData);
        res.status(201).json(result);
    }

    updateAdoption = async (req, res) => {
        const adoptionId = req.params.aid;
        const updateData = req.body;
        const result = await this.AdoptionServices.update(adoptionId, updateData);
        res.status(200).json({ message: "Adopción actualizada correctamente", payload: result });
    }

    deleteAdoption = async (req, res) => {
        const adoptionId = req.params.aid;
        await this.AdoptionServices.remove(adoptionId);
        res.status(200).json({ message: "Adopción eliminada correctamente" });
    }
}
