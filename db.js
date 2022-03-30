const bcrypt = require('bcryptjs');

exports.users = [
  {
    id: 'f22c2fc9-6062-480a-bc81-6ad66c044c51',
    firstName: 'root',
    lastName: 'admin',
    password: bcrypt.hashSync('admin', bcrypt.genSaltSync(12)),
    roles: ['ADMIN', 'MEMBER'],
  }
];
