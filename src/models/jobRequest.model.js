 

export default (sequelize, Sequelize) => {
    const jobRequestModel = sequelize.define("jobRequest", {
        clientId:Sequelize.INTEGER,
        jobId:Sequelize.STRING,
        jobTitle:Sequelize.STRING,
        jobDescription:Sequelize.TEXT,
        jobType: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        jobCategory:Sequelize.STRING,
        jobLocation:Sequelize.STRING,
        experience:Sequelize.STRING,
        qualifications:Sequelize.JSON,
        NoOfOpenings:Sequelize.INTEGER,
        postingDate:Sequelize.DATE,
        expiryDate:Sequelize.DATE,
        languagesRequired:Sequelize.JSON,
        isRemote:{
            type:Sequelize.STRING,
            defaultValue:'NO'
        },
        minSalary: {
            type: Sequelize.FLOAT,
            allowNull: true,
          },
        maxSalary: {
            type: Sequelize.FLOAT,
            allowNull: true,
          },
        currency: {
            type: Sequelize.STRING,
            defaultValue: "INR",
          },
        skillsRequired: {
            type: Sequelize.JSON,  
            allowNull: true,
          },
        status: {
            type: Sequelize.STRING,
            defaultValue: "Open",
          },  
        deleted:{
            type:Sequelize.STRING,
            defaultValue:'NO'
        },
         
    });

    jobRequestModel.sync({ alter: true });
    return jobRequestModel;
};
