module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        u_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        u_name: {
            type: DataTypes.STRING,
        },
        u_gender: {
            type: DataTypes.STRING,
        },
        u_location: {
            type: DataTypes.STRING,
        },
    });

    return User;
};
