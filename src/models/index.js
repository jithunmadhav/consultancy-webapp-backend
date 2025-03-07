import Sequelize from "sequelize";
import { dbconnect } from "../config/dbconfig.js";
import clientModel from "./client.model.js";
import adminModel from "./admin.model.js";
import jobRequestModel from "./jobRequest.model.js";
import applicationsModel from "./applications.model.js";
import candidateModel from "./candidate.model.js";
import skillRatingModel from "./skillRating.model.js";
import programmingSkillsModel from "./programmingSkills.model.js";
import stagingModel from "./staging.model.js";
const sequelize = new Sequelize(dbconnect.DB, dbconnect.USER, dbconnect.PASSWORD, {
    host: dbconnect.HOST,
    dialect: dbconnect.dialect,
    operatorsAliases: false,
    logging: false,
    timezone: '+05:30',
});

const db = {
    Sequelize,
    sequelize,
    admin: adminModel(sequelize, Sequelize),
    client:clientModel(sequelize,Sequelize),
    jobRequest:jobRequestModel(sequelize,Sequelize),
    application:applicationsModel(sequelize,Sequelize),
    candiadate:candidateModel(sequelize,Sequelize),
    skillRating:skillRatingModel(sequelize,Sequelize),
    programmingSkills:programmingSkillsModel(sequelize,Sequelize),
    staging:stagingModel(sequelize,Sequelize)
};

// db.client.hasMany(db.jobRequest, { sourceKey:'id',foreignKey:'clientId'});
db.candiadate.hasMany(db.skillRating,{sourceKey:'id',foreignKey:'candidateId'})

 

export default db;
