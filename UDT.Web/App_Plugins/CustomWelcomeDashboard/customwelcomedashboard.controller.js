angular.module("umbraco").controller("CustomWelcomeDashboardController", function ($scope, userService, logResource, entityResource) {
    var vm = this;
    var user = userService.getCurrentUser().then(function (user) {
        console.log(user);
        vm.UserName = user.name;
    });

    var userLogoptions = {
        pageSize: 10,
        pageNumber: 1,
        orderDirection: "Descending",
        sinceDate: new Date(2018, 0, 1)
    };

    logResource.getPagedUserLog(userLogoptions)
    .then(function (response) {
        console.log(response)
        vm.UserLogHistory = response;
        var filteredLogEntries = [];
        // loop through the response, and filter out save log entries we are not interested in
        angular.forEach(response.items, function (item) {
            // if no entity exists -1 is returned for the nodeId (eg saving a macro would create a log entry without a nodeid)
            if (item.nodeId > 0) {
                if (item.logType == "Save") {
                    if (item.entityType == "Media") {
                        // log entry is a media item
                        item.editUrl = "media/media/edit/" + item.nodeId;
                    } else {
                        console.log(item.entityType);
                        console.log('Not Media');
                    }

                    if (item.entityType == "Document") {
                        // log entry is a media item
                        item.editUrl = "content/content/edit/" + item.nodeId;
                    } else {
                        console.log('Not Document');
                    }

                    console.log(item);
                    // use entityResource to retrieve details of the content/media item
                    entityResource.getById(item.nodeId, item.entityType).then(function(ent) {
                        item.Content = ent;
                    });
                    filteredLogEntries.push(item);
                } else {
                    console.log('Not Save');
                    console.log('log type: ' + item.logType);
                }
            } else {
                console.log('no entity exists');
            }
        });
        vm.UserLogHistory.items = filteredLogEntries;
    });
});