import { AdTo } from "../../../to/ad.to.js";
import {AdService} from "../ad.service.js";

export class AdServiceImpl implements AdService {

    getAllAds(): Promise<AdTo[]> {
        throw new Error("Method not implemented.");
    }
    getAdsByUser(email: string): Promise<AdTo[]> {
        throw new Error("Method not implemented.");
    }
    getAdById(adId: number): Promise<AdTo> {
        throw new Error("Method not implemented.");
    }
    createNewAd(email: string, ad: AdTo): Promise<AdTo> {
        throw new Error("Method not implemented.");
    }
    deleteAd(email: string, adId: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

}