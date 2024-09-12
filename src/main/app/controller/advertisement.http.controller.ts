import {json, Request, Response} from 'express';
import {DeleteMapping, GetMapping, Middleware, PostMapping, RestController} from "../config/core.config.js";

@Middleware([json()])
@RestController("/users/:user/ads")
export class AdvertisementHttpController {

    @GetMapping("/")
    async findAllAds(req: Request, res: Response) {
        console.log("Find all ads");
    }

    @PostMapping("/")
    async postAd(req: Request, res: Response) {
        console.log("Post ad");
    }

    @DeleteMapping("/:id")
    async deleteAd(req: Request, res: Response) {
        console.log("Delete ad");
    }
}