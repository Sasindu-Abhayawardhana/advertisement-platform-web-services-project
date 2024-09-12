export class ErrorTo {
    type: string = "about:blank";
    // type eka specify kale nathn type eka wenne
    // default type eka about:blank

    constructor(public status: number, // error code
                public title: string, // error
                public detail: string, // error details
                public instance: string, //
                public errors: any)  // errors attached karanna
    // parameters public karanawa
    {
    }

}