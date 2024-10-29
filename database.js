const Sequelize = require('sequelize');
const UserModel = require('./models/user');

// Connection for local
const connection = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    pool: {
        min: 0,
        max: 5,
        idle: 10000,
        acquire: 30000,
    },
    define: {
        timestamps: true,
    },
});

const User = UserModel(connection);




connection.sync({ alter: true }).then(() => {
    console.log('Database & Tables created!');
});

module.exports = {
    User,

};
