import express from 'express';
import {controller as AdvertisementController} from "./controller/advertisement.http.controller.js";
import {controller as UserController} from './controller/user.http.controller.js';
import {ping as pingToDatabase} from "./database/pool.database.js";

console.log("Trying to connect with the database server");

await pingToDatabase();
console.log("Connected to the database server - OK")

// create a express app
const app = express();

app.use('/advertisements', AdvertisementController);
app.use('/users', UserController);

// open a server port and listening
app.listen(5050, () => {
    console.log("Server is listening at 5050");
});