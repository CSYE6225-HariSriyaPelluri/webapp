// Reference: https://jestjs.io/docs/mock-function-api#mockfnmockimplementationfn
jest.mock('../models/index', () => {
    const sequilizeMock={};
    sequilizeMock.authenticate= jest.fn()
 
    return  sequilizeMock;
})

const request = require("supertest")
const app = require('../index')
const sequelize = require('../models/index');


describe("health check for /healthz", () => {

    beforeEach(async () => {
        sequelize.authenticate.mockImplementation(()=>{return Promise.resolve()});
      })
    
    it("should pass when database is connected", async () => {
        sequelize.authenticate.mockImplementation(()=>{return Promise.resolve()});

        const response = await request(app).get('/healthz');
        expect(response.status).toBe(200);
        expect(response.body).toBe("")
    });

    it("should throw error when database connection fails", async () => {
        sequelize.authenticate.mockRejectedValue(new Error());

        const response = await request(app).get('/healthz');
        expect(response.status).toBe(503);
    });

    it("should not accept body and throw error", async () => {
        return request(app)
            .get("/healthz")
            .send({"payload":"data"})
            .expect(400)
    });

    it('should not allow request with query parameters and throw error', async () => {
        const response = await request(app).get('/healthz?key=value');
        expect(response.status).toBe(400);
    });
});