var MyCtrl = function($scope) {
    $scope.items = [
        {name: 'Beer', price: 3.50, delivered: "2013-08-05"},
        {name: 'Cola', price: 4.20, delivered: "2013-08-06"}];

    $scope.pluralizer = {
        0: "No beverages!",
        1: "Only one left!",
        other: "{} beverages left."
    }

    $scope.addBeverage = function(){
        $scope.items.push({name: $scope.name, price: $scope.price, delivered: new Date()});
    }

    $scope.removeItem = function(item){
        if(confirm("Remove this beverage. Sure?")){
            $scope.items.splice($scope.items.indexOf(item), 1);
        }
    }
}
