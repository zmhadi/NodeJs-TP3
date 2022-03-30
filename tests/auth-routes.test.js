const request = require('supertest');

test('Test POST login success : ', async () => {
    const res = await request(apiUrl)
    .post('/login')
    .send({
      firstName: 'root',
      password: 'admin'
    }, (req, res) => {
      expect(res.statusCode).toEqual(200);
      expect(req.body).toHaveProperty('firstName', 'password')
      expect(res.body).toHaveProperty('token')
    })
  })

  test('Test POST login wrong password : ', async () => {
    const res = await request(apiUrl)
    .post('/login')
    .send({
      firstName: 'root',
      password: 'admin1'
    })
    expect(res.statusCode).toEqual(401);
  })

  test('Test POST login wrong firstName : ', async () => {
    const res = await request(apiUrl)
    .post('/login')
    .send({
      firstName: 'root1',
      password: 'admin'
    })
    expect(res.statusCode).toEqual(401);
  })

  test('Test POST login without firstName : ', async () => {
    const res = await request(apiUrl)
    .post('/login')
    .send({
      password: 'admin'
    })
    expect(res.statusCode).toEqual(400);
  })