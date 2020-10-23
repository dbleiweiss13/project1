$(document).ready(function () {
    var genres = ['rock', 'country', 'rap', 'R&B', 'Pop', 'Reggae'];
    var maxedOut = []
    //max counter per button
    var maxClicks = 5;
    var genreMaxClicks = 3;

    var musicPref = [];


    genres.forEach(e => {
        var button = $('<div>');
        button.text(e)
        button.addClass('click')
        button.attr('data-genre', e)
        button.attr('id', e)
        $('#buttonDivs').append(button);
    });

    // on click function on buttons
    $('.click').on('click', function () {
        //logic to handle storage 
        var genre = $(this).attr('data-genre')
        // function to handle data storage
        if (maxedOut.indexOf(genre) == -1) {
            trackPicks(genre);

            // $('#' + genre).
        }
        else {
            // undo previous click
        }

        // function to see if total was hit

        // calls the styling of the clicked circles to change in size
        circleChange(genre, this);

    })



    //store preferences
    function trackPicks(genre) {
        // var test = 'rock'

        function isPicked(picked) {
            return picked.genre === genre;
        }

        var picked = musicPref.find(isPicked);

        if (picked == undefined) {
            musicPref.push(
                {
                    genre: genre,
                    count: 1
                }
            )

        }
        else {
            console.log(musicPref)
            picked.count++;
            if (picked.count == 3) {
                maxedOut.push(genre)
            }
        }

    }

    // function to handled the css
    function circleChange(genre, el) {
        
        function isPicked(picked) {
            return picked.genre === genre;
        }

        var picked = musicPref.find(isPicked);

        if (picked.count == 1) {
            $(el).addClass("medium");
        }
        if (picked.count == 2) {
            $(el).removeClass("medium");
            $(el).addClass("large");
        }
        if (picked.count == 3) {
            $(el).removeClass("medium");
            $(el).removeClass("large");
            $(el).addClass("largest");
        }
    }
});