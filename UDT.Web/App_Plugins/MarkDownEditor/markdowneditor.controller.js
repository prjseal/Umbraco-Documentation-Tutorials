angular.module("umbraco")
    .controller("My.MarkdownEditorController",
        // inject umbracos assetsService
        function ($scope, assetsService) {

            // tell the assetsService to load the markdown.editor libs from the markdown editors
            // plugin folder
            assetsService
                .load([
                    "~/App_Plugins/MarkDownEditor/lib/markdown.converter.js",
                    "~/App_Plugins/MarkDownEditor/lib/markdown.sanitizer.js",
                    "~/App_Plugins/MarkDownEditor/lib/markdown.editor.js"
                ])
                .then(function () {
                    // this function will execute when all dependencies have loaded
                    var converter2 = new Markdown.Converter();
                    var editor2 = new Markdown.Editor(converter2, "-" + $scope.model.alias);
                    editor2.run();
                });

            // load the separate css for the editor to avoid it blocking our js loading
            assetsService.loadCss("~/App_Plugins/MarkDownEditor/lib/markdown.css");
        });