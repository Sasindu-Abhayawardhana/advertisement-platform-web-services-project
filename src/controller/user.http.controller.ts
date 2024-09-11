import express, {json, Request, Response} from 'express';
import {UserTo} from "../to/user.to.js";
import {pool} from "../database/pool.database.js";

// start the express router app
export const controller = express.Router();


/*
use the json middleware to identify the req body as a JSON
Also convert it to the JS object
* */
controller.use(json());

// route the request according to the path segment
controller.get("/me", getUserAccount);
controller.post("/", createNewUserAccount);
controller.delete("/me", deleteUserAccount);

async function createNewUserAccount(req: Request,
                              res: Response) {

    console.log("Create new user account");

    const user = req.body as UserTo;

    // need to create a user in database
    // for that need a connection
    // get a connection from pool connection
    // it is important to use new connection for each user,
    // otherwise transaction maybe overlapped
    const connection = await pool.connect();

    try {
        // Insert a new user into database
        await connection.query('INSERT INTO "user" (email, name, contact) VALUES ($1, $2, $3)'
            , [user.email, user.name, user.contact]);
        // if the user creation success send the 201 - Created HTTP Status Codes
        res.sendStatus(201);
    }catch (e){
        console.error(e);
        // if the operation fail send error Internal Server Error - HTTP Status Codes
        res.sendStatus(500);
    }finally {
        // release the db connection resource
        connection.release();
    }


}

function deleteUserAccount(req: Request,
                           res: Response) {
    console.log("Delete user account");
}

function getUserAccount(req: Request,
                        res: Response) {
    console.log("Get user account information")
}