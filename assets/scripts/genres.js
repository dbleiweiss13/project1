$(document).ready(function () {
    var genres = ['Rock', 'Country', 'Rap', 'R&B', 'Pop', 'Reggae'];
    var maxedOut = []
    //max counter per button
    var maxClicks = 5;
    var genreMaxClicks = 3;

    var musicPref = [];


    genres.forEach(e => {
        var button = $('<button>');
        button.text(e)
        button.addClass("click");
        button.attr("data-genre", e);
        button.attr("id", e);
        $("#btnDiv").append(button);
    });

    // on click function on buttons
    $(".click").on("click", function () {
        //logic to handle storage 
        var genre = $(this).attr("data-genre");
        // function to handle data storage
        if (maxedOut.indexOf(genre) == -1) {
            trackPicks(genre);

            // $('#' + genre).

            // function to handled the css
        }
        else {
            // undo previous click
        }
        // function to see if total was hit

        if (wasMaxed(genre)) {
            $(this).attr("disabled", true);
        } else if (allMaxed()){
            $(".click").attr("disabled", true);
        }
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
            picked.count++;
            if (picked.count == 3) {
                maxedOut.push(genre)
            }
        }

    }

    function wasMaxed(genre) {   
        function isPicked(picked) {
            return picked.genre === genre;
        }

        var picked = musicPref.find(isPicked);

        return(picked.count === genreMaxClicks);
    }

    function allMaxed(){
        var tot = 0;

        musicPref.forEach(e => {
            tot += e.count;
        });

        return (tot === maxClicks);
    }
});