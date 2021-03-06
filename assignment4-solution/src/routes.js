(function () {
    'use strict';

    angular.module('Menu')
        .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {

        // Redirect to home page if no other URL matches
        $urlRouterProvider.otherwise('/');

        // *** Set up UI states ***
        $stateProvider

        // Home page
            .state('home', {
                url: '/',
                templateUrl: 'src/menu/templates/home.template.html'
            })

            .state('categories', {
                url: '/categories',
                templateUrl: 'src/menu/templates/main-categories.template.html',
                controller: 'CategoriesController as categories',
                resolve: {
                    items: ['MenuService', function (MenuService) {
                        return MenuService.getCategories();
                    }]
                }
            })

            .state('category', {
                url: '/category/:itemId',
                templateUrl: 'src/menu/templates/category.template.html',
                controller: 'CategoryController as category',
                resolve: {
                    item: ['$stateParams', 'MenuService',
                        function ($stateParams, MenuService) {
                            return MenuService.getItemsForCategory($stateParams.itemId);
                        }]
                }
            });
    }

})();
