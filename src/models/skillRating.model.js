export default (sequelize, Sequelize) => {
    const skillRating = sequelize.define("skillRating", {
        candidateId:Sequelize.INTEGER,
        skill:Sequelize.STRING,
        rating:Sequelize.INTEGER,

    });

    // skillRating.sync({ alter: true });
    return skillRating;
};
