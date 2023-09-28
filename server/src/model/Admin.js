module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define("Admin", {
        Admin_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Admin_user: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Admin_name: {
            type: DataTypes.STRING,
        },
        Admin_lastname: {
            type: DataTypes.STRING,
        },
        Admin_age: {
            type: DataTypes.INTEGER,
        },
    });

    return Admin;
};
