export default (sequelize, Sequelize) => {
    const programmingSkills = sequelize.define("programmingSkills", {
        name: Sequelize.STRING,
        deleted:{
            type:Sequelize.STRING,
            defaultValue:'NO'
        }

    });

    programmingSkills.sync({ alter: true });
    return programmingSkills;
};
