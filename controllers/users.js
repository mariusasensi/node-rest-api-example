const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const home = async (request, response) => {
  const {limit = 5, from = 0} = request.query;

  const [total, users] = await Promise.all([
    User.countDocuments({status: true}),
    User.find({status: true}).skip(Number(from)).limit(Number(limit))
  ]);

  const authUser = request.user;
  response.json({total, users, authUser});
};

const add = async (request, response) => {
  const {name, mail, password, role} = request.body;
  const user = new User({name, mail, password, role});

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

  response.status(201).json({user});
}

const put = async (request, response) => {
  const id = request.params.id;
  const {_id, password, google, mail, ...user} = request.body;

  // Validar ID.
  if (password) {
    user.password = bcryptjs.hashSync(password, bcryptjs.genSaltSync());
  }

  await User.findByIdAndUpdate(id, user);
  const updated = await User.findById(id);

  response.json(updated);
}

const del = async (request, response) => {
  const id = request.params.id;
  if (id === request.user.id) {
    return response.status(400).json('You cannot erase yourself.');
  }

  await User.findByIdAndUpdate(id, {'status': false});
  const updated = await User.findById(id);

  response.json({updated});
}

module.exports = { home, add, put, del };