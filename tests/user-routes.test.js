const request = require('supertest');
let token = ""
let firstName = "root"

async function getToken() {
    const res = await request(apiUrl)
      .post('/login')
      .send({
        firstName: firstName,
        password: 'admin'
      });  
    token = res.body.token;
  }  
  beforeEach(async() => {
    await getToken();
  });

  test('Test GET users with token : ', async () => {
    const res = await request(apiUrl)
      .get('/users')
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.type).toBe('application/json');
    });
  })

  test('Test GET users without token : ', async () => {
    const res = await request(apiUrl)
      .get('/users')
      .then((response) => {
        expect(response.statusCode).toEqual(500);
    });
  })
  
  test('Test POST users with unvalid password : ', async () => {
    const res = await request(apiUrl)
    .post('/users')
    .set('Authorization', `Bearer ${token}`)
    .send({
      firstName: 'root123',
      lastName: 'mhadi',
      password: 'm'
    })
    expect(res.statusCode).toEqual(400);
  })

  test('Test POST users without password: ', async () => {
    const res = await request(apiUrl)
    .post('/users')
    .set('Authorization', `Bearer ${token}`)
    .send({
      firstName: 'root123',
      lastName: 'mhadi',
    })
    expect(res.statusCode).toEqual(400);
  })

  test('Test POST users sucess : ', async () => {
    const res = await request(apiUrl)
    .post('/users')
    .set('Authorization', `Bearer ${token}`)
    .send({
      firstName: 'root123',
      lastName: 'mhadi',
      password: 'adminnnnnnn'
    })
    expect(res.statusCode).toEqual(201);
  })

