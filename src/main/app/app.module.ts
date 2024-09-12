import {Module} from "./config/core.config.js";
import {UserHttpController} from "./controller/user.http.controller.js";
import {AdvertisementHttpController} from "./controller/advertisement.http.controller.js";

// methna kynne, kwd app eke controllers kyala
@Module([UserHttpController, AdvertisementHttpController])
export class AppModule{}