module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userToken: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userPIN: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Users;
};
