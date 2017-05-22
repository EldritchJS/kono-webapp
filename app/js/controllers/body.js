"use strict";

angular.module("konoWeb")
  .controller("BodyCtrl", [
      "$scope",
      "$rootScope",
      "alertActions",
      function(
        $scope,
        $rootScope,
        alertActions) {
    $rootScope.alerts = [];
    $rootScope.bodyClass = "";
    $scope.removeAlert = alertActions.removeAlert;
  }]);
