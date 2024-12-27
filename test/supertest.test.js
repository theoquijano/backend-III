import supertest from "supertest"
import chai from "chai"

const expect = chai.expect
const requester = supertest("http://localhost:8080/")

describe("Testing adoptme", () => {
    describe("Testing de mascotas: ", () => {
        it("Endpoint POST /api/pets debe crear una mascota correctamente", async () => {
            const mascotaApiPerrito = {
                name: 'slashi',
                specie: 'cocker',
                birthDate: '14-02-2012'
            }

            const { statusCode, ok, _body } = await requester.post("/api/pets").send(mascotaApiPerrito)

            console.log(statusCode)
            console.log(ok)
            console.log(_body)


            expect(_body.payload).to.have.property("_id")
        })

        it("La mascota creada debe tener la propiedad adopted con el valor falso", async () => {

            const nuevaMascota = {
                name: "Rulo",
                specie: "perro",
                birthDate: "2018-03-2012"
            }

            const { statusCode, body } = await requester.post("/api/pets").send(nuevaMascota)

            expect(statusCode).to.equal(200)
            expect(body.payload).to.have.property("adopted").that.equals(false)
        })

        it("La respuesta debe tener los campos status y payload, de tipo arreglo", async () => {
            const { statusCode, body } = await requester.get("/api/pets")

            expect(statusCode).to.equal(200)
            expect(body).to.have.property("payload").that.is.an("array")
        })

    })
})



