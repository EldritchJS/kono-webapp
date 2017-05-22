"use strict";

angular.module("ophicleideWeb")
  .controller("ModelsModalCtrl", [
      "$scope",
      "$rootScope",
      "$uibModalInstance",
      "$log",
      "alertActions",
      "modelActions",
      function(
        $scope,
        $rootScope,
        $uibModalInstance,
        $log,
        alertActions,
        modelActions) {

    var fields = {
      name: "",
      urls: "",
      nameEmpty: false,
      urlsEmpty: false,
    };
    $scope.fields = fields;

    $scope.ok = function() {
      if ($scope.fields.name === "") {
        $scope.fields.nameEmpty = true;
      }
      else {
        $scope.fields.nameEmpty = false;
      }
      if ($scope.fields.urls === "") {
        $scope.fields.urlsEmpty = true;
      }
      else {
        $scope.fields.urlsEmpty = false;
      }
      if ($scope.fields.nameEmpty === false &&
          $scope.fields.urlsEmpty === false) {
        modelActions.createModel({
          name: $scope.fields.name,
          urls: $scope.fields.urls.split("\n"),
        }).then(function(result) {
          $log.info(result);
          $uibModalInstance.close();
          $rootScope.refresh();
        }, function(error) {
          $uibModalInstance.close();
          alertActions.addDangerAlert("Server Error", error.data);
          $log.info(error);
        });
      }
    };

    $scope.cancel = function() {
      $uibModalInstance.dismiss();
    };

    $scope.classHasError = function(group) {
      if ($scope.hasError(group)) {
        return "has-error";
      }
    };

    $scope.hasError = function(group) {
      var ret = false;
      switch (group) {
        case "name":
          ret = $scope.fields.nameEmpty;
          break;
        case "urls":
          ret = $scope.fields.urlsEmpty;
          break;
      }
      return ret;
    };
  }]);
