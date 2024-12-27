import MockingService from "../services/mocking.js"
import User from '../dao/models/User.js'
import Pet from '../dao/models/Pet.js'

const getMockingPets = async (req, res) => {
    const pets = await MockingService.generateMockingPets(100)
    res.send({ status: "success", payload: pets })
}

const getMockingUsers = async (req, res) => {
    const users = await MockingService.generateMockingUsers(50)
    res.send({ status: "success", payload: users })
}

const generateData = async (req, res) => {
    try {
        const { users, pets } = req.body;


        const generatedUsers = await MockingService.generateMockingUsers(users);
        const generatedPets = await MockingService.generateMockingPets(pets);


        const allUsers = await User.find()
        const allPets = await Pet.find()


        res.send({
            status: "success",
            message: "Datos generados exitosamente.",
            generatedUsersCount: generatedUsers.length,
            generatedPetsCount: generatedPets.length,
            totalUsers: allUsers.length,
            totalPets: allPets.length,
        });
    } catch (error) {
        console.error("Error generando datos:", error);
        res.status(500).send({ status: "error", message: "Error generando datos." });
    }
};


export default {
    getMockingPets,
    getMockingUsers,
    generateData
}