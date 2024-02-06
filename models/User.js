const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    }
}, {
    createdAt: 'account_created',
    updatedAt: 'account_updated',
    indexes: [{
        fields: ['username', 'id'],
        unique: true,
    }]
});

module.exports = User;