"use strict";

import {GetHelloWorldResponse} from "../../src/app/greeting/gethelloworldresponse";
import {HelloWorld} from "../../src/app/greeting/helloworld";
import {HttpClientStub} from "../stubs";
import chai from "chai";

function wait() {
    return new Promise((resolve, reject) => {
            setTimeout(resolve, 200);
        });
}

describe("HelloWorldController Test ", () => {

    it("does nothing when there is no input", () => {
        let sut = new HelloWorld(HttpClientStub.ok());
        sut.inputText = undefined;
        sut.labelText = "Hello";

        sut.submit();

        chai.expect(sut.labelText).to.empty;
    });

    it("can handle a valid response", () => {
        let res = new GetHelloWorldResponse();
        res.name = "Hello World!";
        let httpStub = HttpClientStub.ok(res);
        let sut = new HelloWorld(httpStub);
        sut.inputText = "Hello";

        sut.submit();

        return wait().then(() => {
            chai.expect(sut.labelText).to.equal("Hello World!");
        });
    });

    it("can handle an error response", () => {
        let httpStub = HttpClientStub.error();
        let sut = new HelloWorld(httpStub);
        sut.inputText = "Error";
        sut.labelText = "Hello";

        sut.submit();

        return wait().then(() => {
            chai.expect(sut.labelText).to.empty;
        });
    });

});