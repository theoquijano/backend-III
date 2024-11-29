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
        // Obtener parámetros desde la solicitud
        const { users, pets } = req.body;

        // Generar y guardar usuarios y mascotas en la base de datos
        const generatedUsers = await MockingService.generateMockingUsers(users);
        const generatedPets = await MockingService.generateMockingPets(pets);

        // Validar los registros creados
        const allUsers = await User.find(); // Consultar todos los usuarios en la base de datos
        const allPets = await Pet.find(); // Consultar todas las mascotas en la base de datos

        // Enviar respuesta con datos generados y validados
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