'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bitcoins = sequelize.define('Bitcoins', {
    name: DataTypes.STRING,
    symbol: DataTypes.STRING,
    price: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    favorite: DataTypes.BOOLEAN
  }, {});
  Bitcoins.associate = function(models) {
    // associations can be defined here
  };
  return Bitcoins;
};