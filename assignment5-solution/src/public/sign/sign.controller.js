(function () {
    "use strict";

    angular.module('public')
        .controller('RegistrationController', RegistrationController);

    RegistrationController.$inject = ['SignService'];
    function RegistrationController(SignService) {
        var reg = this;
        reg.isMenuNotExist = false;
        reg.isSaved = false;

        reg.submit = function () {
            SignService.registerUser(reg.user);
            var foundMenu = SignService.isMenuExist(reg.user.menuNumber);

            if (foundMenu) {
                foundMenu.then(function (menuExist) {
                    reg.isMenuNotExist = menuExist ? false : true;
                    reg.isSaved = menuExist;
                    reg.completed = true;
                });
            }
        };
    }
})();
