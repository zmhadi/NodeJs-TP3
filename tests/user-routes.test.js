const request = require('supertest');
let token = ""

function getToken() {
    request(apiUrl)
      .post('/users/login')
      .send({
        firstName: 'root',
        password: 'admin'
      })
      .end((req, res) => {
        token = res.body.accessToken
      })
    }  
  

  beforeEach(() => {
    getToken();
  });

  /*test('Test POST login : ', async () => {
    const res = await request(apiUrl)
    .post('/users/login')
    .send({
      firstName: 'root',
      password: 'admin'
    })
    expect(res.statusCode).toEqual(201);
  })*/

    test('Test GET users : ', async () => {
      const res = await request(apiUrl)
        .get('/users')
      expect(res.statusCode).toEqual(200);
    })
  
    test('Test POST users : ', async () => {
      console.log(`Bearer ${token}`)
      const res = await request(apiUrl)
      .post('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        firstName: 'root123',
        lastName: 'mhadiiii',
        password: 'adminnnnnnn'
      })
      expect(res.statusCode).toEqual(201);
    })