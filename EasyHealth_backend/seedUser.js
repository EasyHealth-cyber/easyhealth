// seedUser.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

mongoose.connect('mongodb://localhost:27017/easyhealth');

async function createUser() {
  const hash = await bcrypt.hash('123456', 10);
  await User.create({ email: 'admin@easyhealth.com', password: hash });
  console.log('User created');
  mongoose.disconnect();
}

createUser();
