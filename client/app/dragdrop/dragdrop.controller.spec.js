'use strict';

describe('Controller: DragdropCtrl', function () {

  // load the controller's module
  beforeEach(module('eventsMongoApp'));

  var DragdropCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DragdropCtrl = $controller('DragdropCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
