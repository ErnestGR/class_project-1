'use strict';
//Bring in the bcrypt package into the file
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});

  User.associate = function(models) {
    // associations can be defined here
  };

  //Validates that the user password is correct
  User.prototype.login = function(password) {
    return bcrypt.compareSync(password, this.password);
  }

  //Hooks are automatic methods that run during various phases of the User Model lifecycle
  //In this case, before a User is created, we will automatically hash their password
  User.hook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });

  return User;
};