var fwbApp = angular.module('fwbApp', []);

var defaultSettings = {
    emptyWeight: 913,
    fuel: 100,
    oil: 11,
    pilotCoPilot: 80,
    passengers: 0,
    baggageHold: 5,
    maxTakeOffWeightNormal: 1280,
    armEmptyWeight: 967.74,
    armFuel: 1219,
    armOil: -381,
    armPilotCoPilot: 914.5,
    armPassengers: 1778,
    armBaggageHold: 2413
};

// Routes
fwbApp.config(function ($routeProvider) {
    $routeProvider
        .when('/',
        {
            controller: 'FuelAndWeightBalanceController',
            templateUrl: 'partials/calculator.html'
        })
        .when('/settings',
        {
            controller: 'FuelAndWeightBalanceController',
            templateUrl: 'partials/settings.html'
        })
        .when('/disclaimer',
        {
            templateUrl: 'partials/disclaimer.html'
        })
        .otherwise({redirectTo: '/'});
});

fwbApp.controller('FuelAndWeightBalanceController', function ($scope, $http) {
    // Init Web storage
    if (!localStorage.settings) {
        localStorage.settings = JSON.stringify(defaultSettings);
    }

    // Init from settings
    $scope.settings = JSON.parse(localStorage.settings);

    // Init calc object
    $scope.calc = {
        emptyWeight: $scope.settings.emptyWeight,
        fuel: $scope.settings.fuel,
        oil: $scope.settings.oil,
        pilotCoPilot: $scope.settings.pilotCoPilot,
        passengers: $scope.settings.passengers,
        baggageHold: $scope.settings.baggageHold};

    $scope.totalWeight = function () {
        return $scope.calc.emptyWeight +
            ($scope.calc.fuel * 0.7) +
            ($scope.calc.oil * 0.9) +
            $scope.calc.pilotCoPilot +
            $scope.calc.passengers +
            $scope.calc.baggageHold;
    };

    $scope.totalWeightStyle = function () {
        if ($scope.totalWeight() > $scope.settings.maxTakeOffWeightNormal) {
            return 'color:red;'
        } else {
            return '';
        }
    }

    $scope.totalMomentum = function () {
        return ($scope.calc.emptyWeight * $scope.settings.armEmptyWeight) +
            ($scope.calc.fuel * 0.7 * $scope.settings.armFuel) +
            ($scope.calc.oil * 0.9 * $scope.settings.armOil) +
            ($scope.calc.pilotCoPilot * $scope.settings.armPilotCoPilot) +
            ($scope.calc.passengers * $scope.settings.armPassengers) +
            ($scope.calc.baggageHold * $scope.settings.armBaggageHold);
    }

    $scope.fwb = function () {
        var temp = $scope.totalMomentum() / $scope.totalWeight();
        drawFWBCanvas(temp);
        return temp;
    }

    $scope.$watch('calc.fuel', function () {
        $scope.calc.fuel = parseFloat($scope.calc.fuel);
    });

    $scope.$watch('calc.pilotCoPilot', function () {
        $scope.calc.pilotCoPilot = parseFloat($scope.calc.pilotCoPilot);
    });

    $scope.$watch('calc.passengers', function () {
        $scope.calc.passengers = parseFloat($scope.calc.passengers);
    });

    $scope.$watch('calc.baggageHold', function () {
        $scope.calc.baggageHold = parseFloat($scope.calc.baggageHold);
    });

    $scope.$watch('calc.baggageHold', function () {
        $scope.calc.baggageHold = parseFloat($scope.calc.baggageHold);
    });

    $scope.saveAlert = "";
    $scope.restoreAlert = "";

    $scope.save = function () {
        //localStorage["settings"] = JSON.stringify($scope.settings);
        localStorage.settings = JSON.stringify($scope.settings);
        $scope.saveAlert = "Settings saved.";
        $scope.restoreAlert = "";
    }

    $scope.restore = function () {
        $scope.settings = defaultSettings;
        localStorage.settings = JSON.stringify(defaultSettings);
        $scope.restoreAlert = "Settings restored.";
        $scope.saveAlert = "";
        $scope.reset();
    }
});

function drawFWBCanvas(newValue) {
    var canvas = document.getElementById('fwbCanvas');
    var context = canvas.getContext('2d');

    // normalise values
    var min = (1025 - canvas.width) * 0.95;
    var max = (1115 - canvas.width) * 0.95;

    var position = (newValue - canvas.width) * 0.95;

    // Create Linear Gradients
    // x0,y0,x1,y1 start x, start y, end x end y
    var lingrad = context.createLinearGradient(0, 0, canvas.width, canvas.height);
    lingrad.addColorStop(0, 'red');
    lingrad.addColorStop(0.25, 'yellow');
    lingrad.addColorStop(0.5, 'green');
    lingrad.addColorStop(0.75, 'yellow');
    lingrad.addColorStop(1, 'red');

    // assign gradients to fill and stroke styles
    context.fillStyle = lingrad;

    // draw shapes
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.font = "bold 12px Arial";
    context.fillStyle = "black";
    context.fillText("1025", min - 35, 45);
    context.fillText("1115", max + 5, 45);

    // Front - back

    context.fillStyle = "black";
    context.fillText("Front", 50, 30)
    context.fillText("Back", 610, 30);


    // Minimal value
    context.beginPath();
    context.moveTo(min, 0);
    context.lineTo(min, canvas.height);
    context.stroke();

    // Max value
    context.beginPath();
    context.moveTo(max, 0);
    context.lineTo(max, canvas.height);
    context.stroke();

    // Current value
    context.beginPath();
    context.moveTo(position, 0);
    context.lineTo(position, canvas.height);
    context.stroke();

    context.beginPath();
    context.moveTo(position, 10);
    context.lineTo(position - 5, 0);
    context.lineTo(position + 5, 0);
    context.lineTo(position, 10);
    context.closePath();
    context.fillStyle = "black";
    context.fill();
}



