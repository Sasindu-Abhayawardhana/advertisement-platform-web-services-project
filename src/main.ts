/*
import express from 'express';
import {AdvertisementHttpController} from "./main/app/controller/advertisement.http.controller.js";
import {UserHttpController} from './main/app/controller/user.http.controller.js';
import {ping as pingToDatabase} from "./main/app/config/database.config.js";

console.log("Trying to connect with the database server");

await pingToDatabase();
console.log("Connected to the database server - OK")

const app = express();

app.use('/advertisements', AdvertisementHttpController);
app.use('/users', UserHttpController);

app.listen(5050, () => {
    console.log("Server is listening at 5050");
});*/

//dn me sampurna kathawama arn gya core config eka athulata, express app eka hadana eka
// methna hadanawa boostrap kyla method ekak


import {ExpressApp} from "./main/app/config/core.config.js";
import {AppModule} from "./main/app/app.module.js";

function bootstrap(){
    const app = ExpressApp.create(AppModule);
    app.listen(5050, ()=>{
        console.log("Server is listening at 5050");
    });
}

bootstrap();