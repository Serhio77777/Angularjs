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
        $scope.classChange = location.classChange;
    })
.service('location', function($localStorage) {
    function getItems() {
        return $localStorage.newItemsSave || [];
    };
    return {
          getAll: function() {
              return getItems();
          },
          removeItem: function(index, item) {
              return $localStorage.newItemsSave = getItems().filter(function(el, ind) {
                  return index !== ind;
              });
            },
          addItem: function(item) {
              $localStorage.newItemsSave.push(item);
              return getItems();
          },
          classChange: function(item) {
              item.checked = !item.checked;
          }
      }
})
.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind('keydown keypress', function (event) {
            if (event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});
