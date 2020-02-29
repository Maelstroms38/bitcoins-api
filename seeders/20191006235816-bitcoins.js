'use strict';

const faker = require('faker');

const bitcoins = [...Array(100)].map((bitcoin) => (
  {
    name: faker.finance.currencyName(),
    symbol: faker.finance.currencyCode(),
    price: faker.finance.amount(),
    imageUrl: "https://picsum.photos/200/200",
    favorite: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }
))

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Bitcoins', bitcoins);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
