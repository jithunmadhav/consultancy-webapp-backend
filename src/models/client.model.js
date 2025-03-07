export default (sequelize, Sequelize) => {
    const client = sequelize.define("client", {
        username: Sequelize.STRING,
        clientId:Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.STRING,
        otp:Sequelize.INTEGER,
        companyName:Sequelize.STRING,
        mobile:Sequelize.STRING,
        clientType:Sequelize.STRING,
        token:Sequelize.STRING,
        banned:{
            type:Sequelize.STRING,
            defaultValue:'NO'
        },
        stagingList:Sequelize.JSON,
        otpExpiry:Sequelize.DATE
    });

    client.sync({ alter: true });
    return client;
};
