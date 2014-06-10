$(document).ready(function() {

    $('#submit').click(function(e) {
        e.preventDefault();
        $('#palettes').empty();
        var searchterm = $('#searchterm').val();

        $.getJSON('http://www.colourlovers.com/api/palettes?format=json&keywords=' + searchterm + '&jsonCallback=?', function(data) {
            console.log(data[0]);
            for (i = 0; i < data.length; i++) {
                var colors = (data[i]['colors']);
                $('#palettes').append('<li class="palette" id="palette' + i + '"></li>');
                for (j = 0; j < colors.length; j++) {
                    $('#palette' + i).append('<div class="color" style="background-color:#' + colors[j] + '" data-color="' + colors[j] + '"></div>');
                }
                $('#palette' + i).append('<a href="#" class="get-sass">Get SASS Colors</a>');
            }
        });
    });

    $('#palettes').on('click', 'a', function() {
        var sasscolors = [];
        $(this).siblings('.color').each(function() {
            sasscolors.push($(this).attr('data-color'));
        });
        console.log(sasscolors);
        $('.modal').html(
            '<a href="#" id="close">x</a><span>$primary-color: #' + sasscolors[0] + ';</span><span>$secondary-color: #' + sasscolors[1] + ';</span><span>$third-color: #' + sasscolors[2] + ';</span><span>$fourth-color: #' + sasscolors[3] + ';</span><span>$fifth-color: #' + sasscolors[1] + ';</span>'
        ).show();
        $('.overlay').show();
    });
    $('.overlay').click(function() {
        $(this).hide();
        $('.modal').empty().hide();
    });
    $('.modal').on('click', '#close', function() {
        $('.modal').empty().hide();
        $('.overlay').hide();
    });
});
