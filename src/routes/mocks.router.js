import { Router } from 'express'

const router = Router()

import mocksController from '../controllers/mocks.controller.js'

router.get("/mockingpets", mocksController.getMockingPets)

router.get("/mockingusers", mocksController.getMockingUsers)

router.post("/generatedata", mocksController.generateData)
//Debe recibir los parametros numericos "users" y "pets" para generar e insertar en la base de datos la cantidad de registros indicados, comprobar dichos registros insertados mediantes los servicios GET de users y pets


export default router