module.exports = (sequelize, DataTypes) => {
    const Orders = sequelize.define("Orders", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dinner: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ammount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        }
    })

    return Orders;
}