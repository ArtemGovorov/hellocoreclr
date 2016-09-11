/// <reference path="../../typings/index.d.ts" />

"use strict";

export class Config {
    public static $inject = ["$stateProvider", "$urlRouterProvider"];

    constructor($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) {
        $urlRouterProvider.otherwise("/helloworld");

        $stateProvider
            .state("helloworld", {
                url: "/helloworld",
                templateUrl: "app/greeting/helloworld.html",
                controller: "HelloWorldController",
                controllerAs: "vm"
            });
    }
}
