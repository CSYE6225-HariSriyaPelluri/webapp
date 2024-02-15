const request = require("supertest")
const app = require("../../index")
const sequelize = require("../../models/index")

describe('/v1/user Integration Tests', () => {
    const testUser = {
        first_name: 'John',
        last_name: 'Smith',
        password: "VerySecurePassword!",
        username: 'sriyap@gmail.com'
    };
    let basicAuthHeader;

    beforeAll( async() => {
        const userCredentials = Buffer.from(`${testUser.username}:${testUser.password}`).toString('base64');
        basicAuthHeader = `Basic ${userCredentials}`;
        await sequelize.sync({force: true})
    });
  
    it('Test 1 - Create an account and validate it exists', async () => {
      await request(app)
        .post('/v1/user')
        .send(testUser)
        .expect(201);
  
      await request(app)
        .get('/v1/user/self')
        .set('Authorization', basicAuthHeader)
        .expect(200)
        .then((response) => {
          expect(response.body.username).toEqual(testUser.username);
        });
    });
  
    it('Test 2 - Update the account and validate the account was updated', async () => {

      const newName = 'Updated Name';
      await request(app)
        .put('/v1/user/self')
        .set('Authorization', basicAuthHeader)
        .send({ first_name: newName })
        .expect(204);
  
      await request(app)
        .get('/v1/user/self')
        .set('Authorization', basicAuthHeader)
        .expect(200)
        .then((response) => {
          expect(response.body.first_name).toEqual(newName);
        });
    });

    afterAll(()=>{
        sequelize.close();
    })
  });