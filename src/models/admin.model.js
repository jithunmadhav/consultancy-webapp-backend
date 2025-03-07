export default (sequelize, Sequelize) => {
    const adminLogin = sequelize.define("admin", {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.STRING,
        otp:Sequelize.INTEGER,
        otpExpiry:Sequelize.DATE

    });

    adminLogin.sync({ alter: true });
    return adminLogin;
};
