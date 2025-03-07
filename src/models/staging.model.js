export default (sequelize, Sequelize) => {
    const staging = sequelize.define("staging", {
        stagingName:Sequelize.STRING,
        deleted:{
            type:Sequelize.STRING,
            defaultValue:'NO'
        }

    });

    staging.sync({ alter: true });
    return staging;
};
