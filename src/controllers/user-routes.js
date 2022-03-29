const express = require('express');
const router = express.Router();
const userRepository = require('../models/user-repository');
const { body, validationResult } = require('express-validator');

router.get('/', (req, res) => {
  res.send(userRepository.getUsers())
});

router.post('/login', body('firstName').not().isEmpty() ,
                      body('password').not().isEmpty() ,
                      (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  if(userRepository.isAuthentified(req.body) == false) {
    res.status(401).send("Login failed !")
  }
  userRepository.isAuthentified(req.body)
  res.status(201).send({accessToken : userRepository.isAuthentified(req.body)});
})

router.get('/:firstName', (req, res) => {
  const foundUser = userRepository.getUserByFirstName(req.params.firstName);
  if (!foundUser) {
    throw new Error('User not found');
  }
  res.send(foundUser);
});

router.post('/', body('firstName').not().isEmpty() ,
                 body('lastName').not().isEmpty() ,
                 body('password').isLength({ min: 8 }),
                 (req, res) => {
  if(userRepository.isAdmin(req.headers.authorization)) {
    userRepository.createUser(req.body);
    res.status(201).send("User created !");
  }
  res.status(401).send("No permission !")
});

router.put('/:id', (req, res) => {
  if(userRepository.isAdmin(req.headers.authorization)) {
    userRepository.updateUser(req.params.id, req.body);
    res.status(204).send("Modification saved !");
  }
  res.status(401).send("No permission !")
});

router.delete('/:id', (req, res) => {
  if(userRepository.isAdmin(req.headers.authorization)) {
    userRepository.deleteUser(req.params.id);
    res.status(204).send("User deleted !");
  }
  res.status(401).send("No permission !")
});

exports.initializeRoutes = () => {
  return router;
}
