export default (sequelize, Sequelize) => {
    const applications = sequelize.define("applications", {
        jobId:Sequelize.INTEGER,
        applicationId:Sequelize.STRING,
        clientId:Sequelize.INTEGER,
        candiateId:Sequelize.INTEGER,
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
        reasonForLeaving:Sequelize.TEXT,
        currentSalary:Sequelize.STRING,
        expectedSalary:Sequelize.STRING,
        coverNote:Sequelize.TEXT,
        stagingStatus:{
            type:Sequelize.STRING,
            defaultValue:'Applied'
        },
        appliedDate:{
            type:Sequelize.DATE,
            defaultValue:Sequelize.NOW
        },
        viewed:{
            type:Sequelize.STRING,
            defaultValue:'NO'
        },
        deleted:{
            type:Sequelize.STRING,
            defaultValue:'NO'
        },
    });

    applications.sync({ alter: true });
    return applications;
};
