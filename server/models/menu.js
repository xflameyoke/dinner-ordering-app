module.exports = (sequelize, DataTypes) => {
    const Menu = sequelize.define("Menu", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })

    return Menu;
}