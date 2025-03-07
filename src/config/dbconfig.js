export const dbconnect = {
    HOST: process.env.ENVIRONMENT === 'development' ? process.env.DEV_HOSTNAME : process.env.STAGING_HOSTNAME,
    USER: process.env.ENVIRONMENT === 'development' ? process.env.DEV_USERNAME : process.env.STAGING_USERNAME,
    PASSWORD: process.env.ENVIRONMENT === 'development' ? process.env.DEV_PASSWORD : process.env.STAGING_PASSWORD,
    DB: process.env.ENVIRONMENT === 'development' ? process.env.DEV_DATABASE : process.env.STAGING_DATABASE,
    PORT: process.env.ENVIRONMENT === 'development' ? process.env.DEV_PORT : process.env.STAGING_PORT,
    dialect: process.env.DEV_DIALECT || 'mysql',
};
