/*
import express from "express";

//  handler eka define karanawa
//  handler eka mona wageda kyla
// TS danne nane, handler eka mona wageda kyla, aluth data type ekak nisa
// api kyla denna one me Handler and Controler kynne me wage ekak kyla
type Handler = {
    path?: string,
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    middlewares?: Array<Function>
}

type Handlers = {
    [handler: string]: Handler
}

type Controller = {
    path?: string,
    middlewares?: Array<Function>,
    handlers?: Handlers
}

type Controllers = {
    [controller: string]: Controller
}

// 1 . create object from controllers
const CONTROLLERS: Controllers = {};

export function Module(controllers: Array<Function>){
    return function(constructor: Function){}
}
// decorators wada karana thathweta ganna yanne
/!*
me decorator register wenna one automatically registor eka athuledi
meya hope karanawa array ekak

* *!/

// 1 kwru hri rest controller eka use kaloth, eyata controllers kyne eke construtcor eka set krla tynawa
export function RestController(path: string = "/"){
    return function(constructor: Function){
        CONTROLLERS[constructor.name].path = path;
        console.log("RestController");
        console.log(CONTROLLERS);
    }
}

export function Middleware([]: Array<Function>){
    return function(target: Object | Function, name?: string, descriptor?: PropertyDescriptor){}
}

export function GetMapping(path: string = "/"){
    return function(target: Object, name: string, descriptor: PropertyDescriptor){}
}

export function PostMapping(path: string = "/"){
    return function(target: Object, name: string, descriptor: PropertyDescriptor){
        console.log("PostMapping");
    }
}

export function PutMapping(path: string = "/"){
    return function(target: Object, name: string, descriptor: PropertyDescriptor){}
}

export function DeleteMapping(path: string = "/"){
    return function(target: Object, name: string, descriptor: PropertyDescriptor){}
}

export function PatchMapping(path: string = "/"){
    return function(target: Object, name: string, descriptor: PropertyDescriptor){}
}

// dn express app eka hadanna yanne methna hadanna yanne
// kalin hdpu main eka wenuwata
// main ekn meka ain krla danawa
export class ExpressApp {
    static create(module: Function){
        const app = express();
        return app;
    }
}*/

import express, {RequestHandler} from "express";

type Handler = {
    name?: string, // handler ekata name ekak thibiya uthui
    path?: string,
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    middlewares?: Array<RequestHandler>
}

type Handlers = {
    [handler: string]: Handler
}

type Controller = {
    path?: string,
    middlewares?: Array<RequestHandler>,
    handlers?: Handlers,
    constructor: Function
}

type Controllers = {
    [controller: string]: Controller
}

const CONTROLLERS: Controllers = {};

export function Module(controllers: Array<Function>) {
    return function (constructor: Function) {
    }
}

export function RestController(path: string = "/") {
    return function (constructor: Function) {
        CONTROLLERS[constructor.name].path = path;
    }
}

export function Middleware(middlewares: Array<RequestHandler>) {
    return function (target: Object | Function, name?: string, descriptor?: PropertyDescriptor) {

//     middle ware eka class ekata dannth puluwn method ekata dnnth puluwn
//     eka identify kara ganna use krnne puluwn apita
        if (!name && !descriptor) {
            // Class
            if (!CONTROLLERS[(target as Function).name]) CONTROLLERS[(target as Function).name] = {};
            CONTROLLERS[(target as Function).name].middlewares = middlewares;
        } else {
            // Method
            if (!CONTROLLERS[target.constructor.name]) CONTROLLERS[target.constructor.name] = {};
            if (!CONTROLLERS[target.constructor.name].handlers) CONTROLLERS[target.constructor.name].handlers = {};
            if (!CONTROLLERS[target.constructor.name].handlers![name!]) CONTROLLERS[target.constructor.name].handlers![name!] = {
                name
            };
            CONTROLLERS[target.constructor.name].handlers![name!].middlewares = middlewares;
        }
    }

}

export function GetMapping(path: string = "/") {
    return function (prototype: Object, name: string, descriptor: PropertyDescriptor) {
        if (!CONTROLLERS[prototype.constructor.name]) CONTROLLERS[prototype.constructor.name] = {
            handlers: {}
        };
        CONTROLLERS[prototype.constructor.name].handlers![name] = {
            path,
            method: 'GET'
        }
    }
}

export function PostMapping(path: string = "/") {
    return function (prototype: Object, name: string, descriptor: PropertyDescriptor) {
        if (!CONTROLLERS[prototype.constructor.name]) CONTROLLERS[prototype.constructor.name] = {
            handlers: {}
        };
        CONTROLLERS[prototype.constructor.name].handlers![name] = {
            path,
            method: 'POST'
        }
    }
}

export function PutMapping(path: string = "/") {
    return function (prototype: Object, name: string, descriptor: PropertyDescriptor) {
        if (!CONTROLLERS[prototype.constructor.name]) CONTROLLERS[prototype.constructor.name] = {
            handlers: {}
        };
        CONTROLLERS[prototype.constructor.name].handlers![name] = {
            path,
            method: 'PUT'
        }
    }
}

export function DeleteMapping(path: string = "/") {
    return function (prototype: Object, name: string, descriptor: PropertyDescriptor) {
        if (!CONTROLLERS[prototype.constructor.name]) CONTROLLERS[prototype.constructor.name] = {
            handlers: {}
        };
        CONTROLLERS[prototype.constructor.name].handlers![name] = {
            path,
            method: 'DELETE'
        }
    }
}

export function PatchMapping(path: string = "/") {
    return function (prototype: Object, name: string, descriptor: PropertyDescriptor) {
        if (!CONTROLLERS[prototype.constructor.name]) CONTROLLERS[prototype.constructor.name] = {
            handlers: {}
        };
        CONTROLLERS[prototype.constructor.name].handlers![name] = {
            path,
            method: 'PATCH'
        }
    }
}

// express app ekak hadanna kynawa
export class ExpressApp {
    static create(module: Function) {
        const app = express(); // aluth app ekak hadanawa => e app eka return krnawa
        // e app eka return krnne kalin, loku controller object eka return krnne kynawa
        console.log(CONTROLLERS);
        console.log('===================')
        console.log(CONTROLLERS['UserHttpController']);
        console.log('===================')
        console.log(CONTROLLERS['AdvertisementHttpController']);

        ///
        // iterate kranne controoler object eka
        // key wadk na values one Key: value
        // controllers deka enawa values vidiyata
        for (const controllerObj of Object.values(CONTROLLERS)) {
            // construtor nthn wadk wenne na, next ekata ynawa
            // knk copntroller hadala, reset controller eka dala na
            // @RestController("/users") tynna one
            // ehma unoth eya controller knk kyla salakan na

            if (!controllerObj.constructor) continue;  // << IMP
            const router = express.Router(); // hama controller ekatma router eka gane hadanna
            // express kynawa router ekak hadala denna kyla

            // dn meka thama ain krnne yanne api
            /*
            * * const router = express.Router();
            const httpController = new UserHttpController();

            router.use(json());
            router.get("/me", httpController.getUserAccount);
            router.post("/", Validators.validateUser, httpController.createNewUserAccount);
            router.delete("/me", httpController.deleteUserAccount);
* */

            // eyage construtor eka run krla, controller eka hada gannawa
            // construtor tynawa nm, eyage object ekak hada gannawa
            // router ekak one object ekak one
            // ethkota ara line deka in wenawa
            /*
            * const router = express.Router();
              const httpController = new UserHttpController();
              *
            * */

            const controller = new (controllerObj.constructor as (new () => any))();
            // class ekak vydta penunta fn ekak vdyta balanna
            // fn ekakata new eka danna den na - not sure

            // dn middelware tika set krnne one
            /*
            router.use(json()); - JSON eka set kala
            * */

            // router ekata middle ware eka set krnne
            // class ekata set krla tyne middlewares tika set wenna one router ekata
            for (const middleware of controllerObj.middlewares!) {
                router.use(middleware);

            }

            // dn handler tika set krnne puluwn
            /*
            router.get("/me", httpController.getUserAccount);
            router.post("/", Validators.validateUser, httpController.createNewUserAccount);
            router.delete("/me", httpController.deleteUserAccount);
            * */
            for (const handler of Object.values(controllerObj.handlers!)) {
                // handlers tika iterate krnawa
                switch (handler.method) {
                    // mapping eka anuwa register krnne one
                    //     handler eke tyna medthod eka balanna
                    case "GET":
                        if (handler.middlewares) {
                            router.get(handler.path!, [...handler.middlewares, controller[handler.name!]]);
                        } else {
                            router.get(handler.path!, controller[handler.name!]);
                        }
                        break;
                    case "POST":
                        /*
                        check middle ware => post ekak danna
                        not => handler ekak danna
                        * */
                        if (handler.middlewares) {
                            router.post(handler.path!, [...handler.middlewares, controller[handler.name!]]);
                        } else {
                            router.post(handler.path!, controller[handler.name!]);
                        }
                        break;
                    case "PUT":
                        if (handler.middlewares) {
                            router.put(handler.path!, [...handler.middlewares, controller[handler.name!]]);
                        } else {
                            router.put(handler.path!, controller[handler.name!]);
                        }
                        break;
                    case "DELETE":
                        if (handler.middlewares) {
                            router.delete(handler.path!, [...handler.middlewares, controller[handler.name!]]);
                        } else {
                            router.delete(handler.path!, controller[handler.name!]);
                        }
                        break;
                    case "PATCH":
                        if (handler.middlewares) {
                            router.patch(handler.path!, [...handler.middlewares, controller[handler.name!]]);
                        } else {
                            router.patch(handler.path!, controller[handler.name!]);
                        }
                        break;
                }
            }

            // app ekata router eka set karanawa
            app.use(controllerObj.path!, router);
        }

        return app;
    }
}

//dn apita one nm meka, node eke install krla, node package ekak vdyta use krnne puluwn
