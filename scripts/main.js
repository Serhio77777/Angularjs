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
      if (item) {
        $localStorage.newItemsSave = $scope.items;
      };
      $scope.newItem = {};
    };
    $scope.removeItem = function(index, item) {
      $scope.items = location.removeItem(index, item);
      $localStorage.newItemsSave = $scope.items;
    };
    $scope.change = "text";
    $scope.item = location.classChange(name);
    $scope.classChange = location.classChange;
    $localStorage.newItemsSave = $scope.items;
})

.service('location', function($localStorage) {
    var items = $localStorage.newItemsSave;
    return {
        getAll: function() {
            return items;
        },
        removeItem: function(index, item) {
            return items = items.filter(function(el, ind) {
                return index !== ind;
            });
        },
        addItem: function(item) {
            items.push(item);
            return items;
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
