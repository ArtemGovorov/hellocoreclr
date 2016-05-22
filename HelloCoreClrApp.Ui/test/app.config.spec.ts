/// <reference path="../typings/globals/mocha/index.d.ts" />
/// <reference path="../typings/globals/chai/index.d.ts" />
/// <reference path="../typings/globals/sinon/index.d.ts" />
/// <reference path="../typings/globals/angular/index.d.ts" />
/// <reference path="../typings/globals/angular-ui-router/index.d.ts" />
"use strict";

describe("Config Test ", () => {
    it("initializes correctly", () => {
        let stateProvider = new stubs.StateProvider();
        let urlRouterProvider = new stubs.UrlRouterProvider();

        let sut = new app.Config(stateProvider, urlRouterProvider);
        chai.expect(urlRouterProvider.otherwise.calledOnce).to.equals(true);
        chai.expect(urlRouterProvider.otherwise.calledWithExactly("/helloworld")).to.equals(true);
        chai.expect(stateProvider.state.called).to.equals(true);
        chai.expect(stateProvider.state.calledWithExactly("helloworld", {
                    url: "/helloworld",
                    templateUrl: "app/greeting/helloworld.html",
                    controller: "HelloWorldController",
                    controllerAs: "vm"
                })).to.equals(true);
    });
});
