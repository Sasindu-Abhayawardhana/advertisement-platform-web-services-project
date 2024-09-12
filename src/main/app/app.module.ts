import {Module} from "./config/core.config.js";
import {UserHttpController} from "./controller/user.http.controller.js";
import {AdvertisementHttpController} from "./controller/advertisement.http.controller.js";

// Add App controllers
@Module([UserHttpController, AdvertisementHttpController])
export class AppModule{}