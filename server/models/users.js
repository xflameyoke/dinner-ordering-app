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
        userNumber: {
            type: DataTypes.FLOAT(9),
            allowNull: false,
        },
        userPIN: {
            type: DataTypes.FLOAT(4),
            allowNull: false,
        },
    });

    return Users;
}