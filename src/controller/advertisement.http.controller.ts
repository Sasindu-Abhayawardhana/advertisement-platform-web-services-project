import express, {Request,Response} from 'express';

export const controller = express.Router();

controller.post('/', postAdvertisement);
controller.get('/', getAllAdvertisements);
controller.delete('/:id', deleteAdvertisement);


function getAllAdvertisements(Request: Request, response: Response) {
    console.log("GET /advertisements/getAllAdvertisements");
}

function postAdvertisement(Request: Request, response: Response) {
    console.log("POST /advertisement");
}

function deleteAdvertisement(Request: Request, response: Response) {
    console.log("DELETE /advertisement");
}



