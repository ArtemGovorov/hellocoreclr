/// <reference path="../../typings/index.d.ts" />
"use strict";

describe("HelloWorldController Test ", () => {
    let $http: ng.IHttpService;
    let $httpBackend: ng.IHttpBackendService;
    let $log: ng.ILogService;
    let apiBaseUrl = "/api/";

    beforeEach(() => {
        inject((_$http_: ng.IHttpService, _$httpBackend_: ng.IHttpBackendService, _$log_: ng.ILogService) => {
            $http = _$http_;
            $httpBackend = _$httpBackend_;
            $log = _$log_;

            let res = new app.greeting.GetHelloWorldResponse();
            res.name = "Hello World!";
            $httpBackend.whenGET(apiBaseUrl + "helloworld/Hello").respond(200, res);
            $httpBackend.whenGET(apiBaseUrl + "helloworld/Error").respond(500);
        });
    });

    it("does nothing when there is no input", () => {
        let logSpy = sinon.spy($log, "warn");
        let sut = new app.greeting.HelloWorldController(apiBaseUrl, $http, $log);

        sut.executeHelloWorld();

        chai.expect(sut.labelText).to.equals("");
        chai.expect(logSpy.calledOnce).to.equals(true);
    });

    it("can handle a valid response", () => {
        let toastrSpy = sinon.spy(toastr, "success");
        let logSpy = sinon.spy($log, "info");
        let sut = new app.greeting.HelloWorldController(apiBaseUrl, $http, $log);
        sut.inputText = "Hello";

        sut.executeHelloWorld();

        $httpBackend.flush();
        chai.expect(sut.labelText, "Hello World!").to.equals("Hello World!");
        chai.expect(toastrSpy.called).to.equals(true);
        chai.expect(logSpy.called).to.equals(true);
    });

    it("can handle an error response", () => {
        let toastrSpy = sinon.spy(toastr, "warning");
        let logSpy = sinon.spy($log, "warn");
        let sut = new app.greeting.HelloWorldController(apiBaseUrl, $http, $log);
        sut.inputText = "Error";

        sut.executeHelloWorld();

        $httpBackend.flush();
        chai.expect(sut.labelText).to.equals("");
        chai.expect(toastrSpy.called).to.equals(true);
        chai.expect(logSpy.calledOnce).to.equals(true);
    });
});
