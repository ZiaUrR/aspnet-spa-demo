/// <reference path="../../typings/tsd.d.ts"/>

module Frontend.Home {
    let module = angular.module('frontend.home', ['frontend']);

    // Define all the controllers here.
    // This gives you a central location to look up any problems with missing controllers.
    module.controller('HomeController', HomeController);
}
