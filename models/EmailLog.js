const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const EmailLog = sequelize.define('EmailLog', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email_sent:{
        type:DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
  });

  module.exports=EmailLog