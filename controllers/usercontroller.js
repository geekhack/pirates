
var mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User =  require('../models/user')

let register = function(req, res) {
 
var newUser = new User(req.body);
newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
newUser.save(function(err, user) {
  if (err) {
    return res.status(400).send({
      message: err
    });
  } else {
    user.hash_password = undefined;
    return res.json(user);
  }
});
};

let sign_in = function(req, res) {
User.findOne({
  email: req.body.loginemail
}, function(err, user) {
  if (err) throw err;
  if (!user || !user.comparePassword(req.body.loginpassword)) {
    return res.status(401).json({ message: 'Failure. Invalid user or password.' });
  }
  const token = jwt.sign({ email: user.email, firstname: user.firstname,lastname: user.lastname, _id: user._id }, 'nice:)')
  return res.json({ 
    token: token
   });   //res.redirect(`/test/route/${token}`);
});
};

let loginRequired = function(req, res, next) {
if (req.user) {
  next();
} else {

  return res.status(401).json({ message: 'Unauthorized user!!' });
}
};
let profile = function(req, res, next) {
if (req.user) {
  res.send(req.user);
  next();
} 
else {
 return res.status(401).json({ message: 'Invalid token' });
}
};

module.exports ={register,loginRequired,profile, sign_in}