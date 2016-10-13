"use strict";

export class HttpClientStub {
    public static ok(responseData: any = {}) {
        return new HttpClientStub(responseData, 200);
    }

    public static error() {
        return new HttpClientStub(undefined, 500);
    }

    private success: boolean;

    constructor(private responseData: any = {}, private status: number = 200) {
        this.success = this.status >= 200 && this.status < 400;
    }

    public fetch (url) {
        return Promise.resolve({
                json: () => this.success ? Promise.resolve(this.responseData) : Promise.reject("An error occured"),
                status: this.status
            });
    }
}
