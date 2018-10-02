var YTCI = YTCI || {
    init: function () {
        YTCI.addListeners();
    },
    addListeners: function () {
        $('#ytci-get-image').on('click', function (e) {
            var button = $(this);
            e.preventDefault();
            var textbox = $(button).prev();
            var url = textbox.val();
            var videoId = '';
            var qs = url.split('?')[1];
            var sURLVariables = qs.split('&');
            for (var i = 0; i < sURLVariables.length; i++)
            {
                var sParameterName = sURLVariables[i].split('=');
                if (sParameterName[0] == 'v')
                {
                    videoId = sParameterName[1];
                }
            }

            var imageUrl = 'https://i.ytimg.com/vi/' + videoId + '/hqdefault.jpg';
            $(textbox).val(imageUrl);
            var image = $(button).next();
            $(image).attr('src', imageUrl);
        });
    }
}