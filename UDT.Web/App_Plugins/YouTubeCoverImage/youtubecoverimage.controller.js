angular.module("umbraco")
    .controller("YouTubeCoverImageController",
        // inject umbracos assetsService
        function ($scope, assetsService) {

            // tell the assetsService to load the ytci libs from the plugin folder
            assetsService
                .load([
                    "~/App_Plugins/YouTubeCoverImage/lib/ytci.js"
                ])
                .then(function () {
                    // this function will execute when all dependencies have loaded
                    YTCI.init();
                });

            // load the separate css for the editor to avoid it blocking our js loading
            assetsService.loadCss("~/App_Plugins/YouTubeCoverImage/lib/ytci.css");
        });