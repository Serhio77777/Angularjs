angular.module('myApp', ['ngStorage'])
  .controller('NewCtrl', function($scope, location, $localStorage) {
    $scope.newItem = {};
    $scope.items = location.getAll();
    $scope.addItem = function (item) {
      if (!item) {
        return;
      };
      $scope.items = location.addItem(item);
      $scope.newItem = {};
    };
    $scope.removeItem = function(index) {
      $scope.items = location.removeItem(index);
    };
    $scope.change = "text";
    $scope.item = location.classChange(name);
    $scope.classChange = location.classChange;
})
.service('location', function($localStorage) {
  var items = $localStorage.newItemsSave || [];
  return {
        getAll: function() {
            return items;
        },
        removeItem: function(index, item) {
            items = items.filter(function(el, ind) {
                return index !== ind;
            });
            $localStorage.newItemsSave = items;
            return items;
          },
        addItem: function(item) {
            items.push(item);
            $localStorage.newItemsSave = items;
            return items;
        },
        classChange: function(item) {
          item.checked = !item.checked;
        }
    }
})
.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind('keydown keypress', function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});
