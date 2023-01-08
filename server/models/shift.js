module.exports = (sequelize, DataTypes) => {
    const Shift = sequelize.define("Shift", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        hours: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })

    return Shift;
}