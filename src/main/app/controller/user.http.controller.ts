import express, {json, Request, Response} from 'express';
import {UserTo} from "../to/user.to.js";
import {Validators} from "../middleware/validators.middleware.js";
import {DeleteMapping, GetMapping, Middleware, PostMapping, RestController} from "../config/core.config.js";

@Middleware([json()]) // Apply this Json middleware to all services
@RestController("/users")
export class UserHttpController {

    @Middleware([Validators.validateUser])
    @PostMapping("/")
    async createNewUserAccount(req: Request, res: Response) {
        const user = req.body as UserTo;
    }

    @DeleteMapping("/me")
    async deleteUserAccount(req: Request, res: Response) {
        console.log("Delete user account");
    }

    @GetMapping("/me")
    async getUserAccount(req: Request, res: Response) {
        console.log("Get user account information")
    }
}

// Following parts are done by using the decorators
/*
const router = express.Router();
const httpController = new UserHttpController();

router.use(json());
router.get("/me", httpController.getUserAccount);
router.post("/", Validators.validateUser, httpController.createNewUserAccount);
router.delete("/me", httpController.deleteUserAccount);*/

