'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await User.bulkCreate([
      {
        firstName:'notBob',
        lastName:'notTheBuilder',
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        firstName:'not',
        lastName:'real',
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2'),
      },
      {
        firstName:'twin',
        lastName:'faketwinlastName',
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3'),

      },
      {
        firstName:'fake',
        lastName:'fake3',
        email: 'fakeuser3@user.io',
        username: 'FakeUser3',
        hashedPassword: bcrypt.hashSync('password4'),

      },
      {
        firstName:'fake4',
        lastName:'fake4',
        email: 'fakeuser4@user.io',
        username: 'FakeUser4',
        hashedPassword: bcrypt.hashSync('password5'),

      },
      {
        firstName:'fake5',
        lastName:'fake5',
        email: 'fakeuser5@user.io',
        username: 'FakeUser5',
        hashedPassword: bcrypt.hashSync('password6'),

      },
      {
        firstName:'fake6',
        lastName:'fake6',
        email: 'fakeuser6@user.io',
        username: 'FakeUser6',
        hashedPassword: bcrypt.hashSync('password7'),

      },
      {
        firstName:'fake7',
        lastName:'fake7',
        email: 'fakeuser7@user.io',
        username: 'FakeUser7',
        hashedPassword: bcrypt.hashSync('password8'),

      },
      {
        firstName:'fake8',
        lastName:'fake8',
        email: 'fakeuser8@user.io',
        username: 'FakeUser8',
        hashedPassword: bcrypt.hashSync('password9'),

      },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});

  }
};
