module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userGroup: {
            type: DataTypes.STRING,
            allowNULL: false,
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
