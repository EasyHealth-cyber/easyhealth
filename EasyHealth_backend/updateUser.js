const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

mongoose.connect('mongodb://localhost:27017/easyhealth');

async function updateUser() {
  const hash = await bcrypt.hash('123456', 10); // Hash the password '123456'
  await User.updateOne(
    { email: 'admin@easyhealth.com' }, // Find the user by email
    { $set: { password: hash } }       // Set the password to the new hash
  );
  console.log('User password updated');
  mongoose.disconnect();
}

updateUser();
