
$(document).ready(function () {
    var genres = ['Rock', 'Country', 'Rap', 'R&B', 'Pop', 'Reggae'];
    var maxedOut = [];

    //max counter per button
    var maxClicks = 5;
    var genreMaxClicks = 3;
    var lastClick;

    var musicPref = [];
    var prefIndex = 0;


    genres.forEach(e => {

        var button = $('<button>');
        button.text(e);
        button.addClass("click small");
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
            lastClick = genre;
            trackPicks(genre);

            // $('#' + genre).
        }
        // function to see if total was hit

        wasMaxed(genre);
        allMaxed();

        // calls the styling of the clicked circles to change in size
        circleChange(genre, this);
    });

    // function to undo
    $('#undo').on('click', function () {
        if (lastClick != null) {
            function isPicked(picked) {
                return picked.genre === lastClick;
            }

            var picked = musicPref.find(isPicked);
            var i = picked.index;

            var id = '#' + picked.genre

            if (musicPref[i].count === 3) {
                $(id).attr("disabled", true);
                maxedOut.splice(maxedOut.indexOf(picked.genre), 1)
            }

            if (maxClicks === 5) {
                $(".click").attr("disabled", false);
            }

            $(id).removeClass('medium');
            $(id).removeClass('large');
            $(id).removeClass('largest');

            picked.count--;

            if (musicPref[i].count == 0) {
                $(id).addClass('small')
                musicPref.splice(i, 1)
                prefIndex--;
            } else {
                circleChange(picked.genre, id);
            }

            musicPref.forEach(e => {
                if (e.count == 3) {
                    $('#' + e.genre).attr("disabled", true);
                }
            });

            lastClick = null;
            wasMaxed(genre);
            allMaxed();
        }
    })

    $('#reset').on('click', function () {
        musicPref.length = 0;
        prefIndex = 0;
        maxedOut.length = 0;

        $('.click').removeClass('medium');
        $('.click').removeClass('large');
        $('.click').removeClass('largest');

        $(".click").attr("disabled", false);

        $('.click').addClass('small');
    })

    //store preferences
    function trackPicks(genre) {

        function isPicked(picked) {
            return picked.genre === genre;
        }

        var picked = musicPref.find(isPicked);

        if (picked == undefined) {
            musicPref.push(
                {
                    genre: genre,
                    count: 1,
                    index: prefIndex
                }
            )
            prefIndex++;

        }
        else {

            picked.count++;

            if (picked.count == 3) {
                maxedOut.push(genre);
            }
        }


    }

    function wasMaxed(genre) {
        function isPicked(picked) {
            return picked.genre === genre;
        }

        var picked = musicPref.find(isPicked);

        if (picked.count === genreMaxClicks) {
            $(this).attr("disabled", true);
        } else {
            $(this).attr("disabled", false);
        }

        console.log(musicPref)
    }

    function allMaxed() {
        var tot = 0;

        musicPref.forEach(e => {
            tot += e.count;
        });

        if (tot === maxClicks) {
            $(".click").attr("disabled", true);
        } else {
            $(".click").attr("disabled", false);
        }
    }


    // function to handled the css
    function circleChange(genre, el) {

        function isPicked(picked) {
            return picked.genre === genre;
        }

        var picked = musicPref.find(isPicked);

        if (picked.count == 0) {
            $(el).removeClass("medium");
            $(el).removeClass("large");
            $(el).removeClass("largest");
            $(el).addClass("small");
        }
        if (picked.count == 1) {
            $(el).removeClass("small");
            $(el).removeClass("large");
            $(el).removeClass("largest");
            $(el).addClass("medium");
        }
        if (picked.count == 2) {
            $(el).removeClass("small");
            $(el).removeClass("medium");
            $(el).removeClass("largest");
            $(el).addClass("large");
        }
        if (picked.count == 3) {
            $(el).removeClass("small");
            $(el).removeClass("medium");
            $(el).removeClass("large");
            $(el).addClass("largest");
        }
    }

    $("#next").on("click", function () {
        var tot = 0;

        musicPref.forEach(e => {
            tot += e.count;
        });

        if (tot === maxClicks){
            localStorage.setItem("prefs", JSON.stringify(musicPref));
            window.location.href = "./test.html";
        }
    });

});

