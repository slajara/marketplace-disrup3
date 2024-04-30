// testear logica de filtrar los eventos
// testear logica de llamada a la api
// testear seteo de Tracker_State
// testear inserción a base de datos

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

beforeEach(async () => {
  
});

test("Aplicación", () => {
  expect("miau").toBe("miau");
});
