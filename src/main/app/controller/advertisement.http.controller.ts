import express, {json, Request, Response} from 'express';
import {DeleteMapping, GetMapping, Middleware, PostMapping, RestController} from "../config/core.config.js";

@Middleware([json()])
@RestController("/ads")
export class AdvertisementHttpController {

    @GetMapping("/")
    async getAllAdvertisements(req: Request, res: Response) {
        console.log("Get all advertisements");
    }

    @PostMapping("/")
    async postAdvertisement(req: Request, res: Response) {
        console.log("Post advertisement");
    }

    @DeleteMapping("/")
    async deleteAdvertisement(req: Request, res: Response) {
        console.log("Delete advertisement");
    }
}

// Following parts are done by using the decorators
/*const router = express.Router();
const httpController = new AdvertisementHttpController();

router.get('/', httpController.getAllAdvertisements);
router.post('/', httpController.postAdvertisement);
router.delete('/:id', httpController.deleteAdvertisement);*/





