export default (sequelize, Sequelize) => {
    const candidate = sequelize.define("candidate", {
        email: Sequelize.STRING,
        mobile:Sequelize.STRING,
        resume:Sequelize.STRING,
        firstName:Sequelize.STRING,
        lastName:Sequelize.STRING,
        zipCode:Sequelize.STRING,
        address:Sequelize.STRING,
        fullAddress:Sequelize.STRING,
        dob:Sequelize.DATE,
        gender:Sequelize.STRING,
        passportNo:Sequelize.STRING,
        totalExperience:Sequelize.STRING,
        relavantExperience:Sequelize.STRING,
        currentCompany:Sequelize.STRING,
        noticePeriod:Sequelize.STRING, 
        currentSalary:Sequelize.STRING,
        expectedSalary:Sequelize.STRING,
        location:Sequelize.STRING,
        role:Sequelize.STRING,
        deleted:{
            type:Sequelize.STRING,
            defaultValue:'NO'
        }
    });

    candidate.sync({ alter: true });
    return candidate;
};
