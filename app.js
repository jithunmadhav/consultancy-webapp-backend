import express from "express";
import "dotenv/config";
import db from './src/models/index.js'; // Ensure this points to the file exporting the db object
import cookieParser from "cookie-parser";
import morgan from "morgan";
import adminRoute from "./src/routes/admin.route.js";
import adminAuthRoute from "./src/routes/admin.auth.route.js"
import clientAuthRoute from './src/routes/client.auth.route.js'
import clientRoute from './src/routes/client.route.js'

const app = express();



// Sync the database
db.sequelize.sync().then(() => {
    console.log('Database connection successfully established');
}).catch((error) => {
    console.error('Failed to connect to the database:', error);
});

app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/admin/auth', adminAuthRoute);
app.use('/client/auth', clientAuthRoute);
app.use('/admin', adminRoute);
app.use('/client', clientRoute);


app.listen(3000, () => {
    console.log("Server started on port 3000");
});
