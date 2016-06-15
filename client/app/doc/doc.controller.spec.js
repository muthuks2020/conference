'use strict';

describe('Controller: DocCtrl', function () {

  // load the controller's module
  beforeEach(module('eventsMongoApp'));

  var DocCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DocCtrl = $controller('DocCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
