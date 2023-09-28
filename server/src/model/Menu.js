module.exports = (sequelize, DataTypes) => {
    const Menu = sequelize.define('Menu', {
        f_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        f_code: {
            type: DataTypes.STRING,
        },
        f_name: {
            type: DataTypes.STRING,
        },
        f_material: {
            type: DataTypes.STRING,
        },
        f_cfp: {
            type: DataTypes.FLOAT, // Assuming f_cfp is of type FLOAT
        },
    });

    return Menu;
};
