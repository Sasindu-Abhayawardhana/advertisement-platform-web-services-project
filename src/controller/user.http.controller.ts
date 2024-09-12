import express, {json, NextFunction, Request, Response} from 'express';
import {UserTo} from "../to/user.to.js";
import {pool} from "../database/pool.database.js";
import {validate} from "class-validator";
import {ErrorTo} from "../to/error.to.js";

// start the express router app
export const controller = express.Router();


/*
use the json middleware to identify the req body as a JSON
Also convert it to the JS object
* */
controller.use(json());

// route the request according to the path segment
controller.get("/me", getUserAccount);
// add the user validation middleware before createNewUserAccount middleware
controller.post("/", validateUser, createNewUserAccount);
controller.delete("/me", deleteUserAccount);

// Here first user validate and if the user details are okay go to the user creation
async function validateUser(req: Request,
                            res: Response,
                            next: NextFunction) {

    // UserTO is the User Transfer Object
    // By creating a Transfer Object its easy to convert JSON to JS Object
    const user = new UserTo();
    Object.assign(user, req.body);

    // Wait until the user validation
    // Here use the class-validator package from npm Registry
    // https://www.npmjs.com/package/class-validator
    const errors = await validate(user);

    if (errors.length > 0) {
        // Use the RFC 9457 standard error msg to send if there is an error of user req details
        // 400 - Bad Request
        res.status(400)
            .json(new ErrorTo(400,
                "Bad Request",
                "Data Validation Failed",
                req.baseUrl + req.url,
                errors));
    } else {
        // if the user details validate go to the next middleware
        next();
    }
}

async function createNewUserAccount(req: Request,
                              res: Response) {


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