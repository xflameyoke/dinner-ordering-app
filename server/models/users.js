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
            type: DataTypes.FLOAT(9),
            allowNull: false,
        },
        userPIN: {
            type: DataTypes.FLOAT(4),
            allowNull: false,
        },
    });

    Users.associate = (models) => {
        Users.hasMany(models.Orders, {
            onDelete: "cascade",
        });
    };

    return Users;
};
