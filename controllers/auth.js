const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-jwt');
const User = require('../models/user');

const init = async(request, response) => {
  const password = process.env.DEFAULT_ADMIN_PASSWORD;
  const user = new User({
    name: 'Admin', 
    mail: process.env.DEFAULT_ADMIN_MAIL, 
    role: 'ADMIN_ROLE'
  });

  // Encrypt.
  user.password = bcryptjs.hashSync(password, bcryptjs.genSaltSync());
  
  try {
    await user.save();
  } catch(error) {
    if (error.name === 'ValidationError') {
      response.status(400);
    } else {
      response.status(500);
    }

    response.json(error.message);
    return;
  }

  response.status(201).json({msg: 'Admin user created!', data: {
    'mail': process.env.DEFAULT_ADMIN_MAIL,
    'password': process.env.DEFAULT_ADMIN_PASSWORD
  }});
};

const login = async (request, response) => {
  const { mail, password } = request.body;

  try {

    const user = await User.findOne({mail, 'status': true});
    if (!user) {
      return response.status(400).json('Invalid user or pass');
    }

    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return response.status(400).json('Invalid user or pass');
    }

    const token = await generateJWT(user.id);
    
    response.json({user, token});
  } catch (error) {
    console.error(error);
    return response.status(500).json("error");
  }
};

module.exports = {init, login};