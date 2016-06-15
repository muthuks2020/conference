angular.module('eventsMongoApp')
.directive('ngColorPicker', function() {
    var defaultColors =  [
        '#7bd148',
        '#5484ed',
        '#a4bdfc',
        '#46d6db',
        '#7ae7bf',
        '#51b749',
        '#fbd75b',
        '#ffb878',
        '#ff887c',
        '#dc2127',
        '#dbadff',
        '#e1e1e1'
    ];
    return {
        scope: {
            selected: '=',
            customizedColors: '=colors'
        },
        restrict: 'AE',
        template: '<ul><li ng-repeat="color in colors" ng-class="{selected: (color===selected)}" ng-click="pick(color)" style="background-color:{{color}};"></li></ul>',
        link: function (scope, element, attr) {
            scope.colors = scope.customizedColors || defaultColors;
            scope.selected = scope.selected || scope.colors[0];

            scope.pick = function (color) {
                scope.selected = color;
            };

        }
    };

})
.directive('colorPicker', function () {
        return {
            // Restrict it to be an attribute in this case
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.colorpicker({
                    colorSelectors: {
                    'red': '#f44336',
                    'pink': '#e91e63',
                    'indigo': '#3f51b5',
                    'cyan': '#00bcd4',
                    'green': '#4caf50',
                    'yellow': '#ffeb3b',
                    'orange': '#ff9800',
                    'grey': '#9e9e9e',
                    'black': '#000000'
                    },
                    format: 'hex',
                    color:  'green',
                    align:'left',
                    input:element
                });
            }
        };
    })