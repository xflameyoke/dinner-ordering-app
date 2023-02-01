module.exports = (sequelize, DataTypes) => {
    const Group = sequelize.define("Group", {
        groupId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        groupDesc: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })

    return Group;
}