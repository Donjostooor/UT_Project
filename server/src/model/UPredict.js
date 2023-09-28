module.exports = (sequelize, DataTypes) => {
    const UPredict = sequelize.define('UPredict', {
        pd_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        pd_name: {
            type: DataTypes.STRING,
        },
        pd_cfp: {
            type: DataTypes.INTEGER,
        },
        pd_time: {
            type: DataTypes.TIME,
        },
    });

    return UPredict;
};
