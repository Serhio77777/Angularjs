angular.module('myApp', ['ngStorage'])
  .controller('NewCtrl', function($scope, location, $localStorage) {
    $scope.newItem = {};
    $scope.items = location.getAll();
    $scope.items = $localStorage.newItemsSave;
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
    $localStorage.newItemsSave = $scope.items;
})
.service('location', function($localStorage) {
  return {
      var items = $localStorage.newItemsSave || [];
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
            return items;
            $localStorage.newItemsSave = items;
        },
        classChange: function(item) {
          item.checked = !item.checked;
        }
    }
})
.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});
