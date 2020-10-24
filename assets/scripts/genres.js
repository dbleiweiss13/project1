
$(document).ready(function() {
    var genres = ['rock','country','rap','R&B','Pop','Reggae'];
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

        if (wasMaxed(genre)) {
            $(this).attr("disabled", true);
        } 
        
        if (allMaxed()){
            $(".click").attr("disabled", true);
        }

        // calls the styling of the clicked circles to change in size
        circleChange(genre, this);
    })


    // function to undo
    $('#undo').on('click',function(){
        if (lastClick != null) {
            function isPicked(picked) { 
                return picked.genre === lastClick;
            }
    
            var picked = musicPref.find(isPicked);
            var i = picked.index

            var id = '#' + picked.genre
    
            if (musicPref[i].count === 3) {
                $(id).attr("disabled", true);
                maxedOut.splice(maxedOut.indexOf(picked.genre),1)
            }
    
            if (maxClicks === 5) {
                $(".click").attr("disabled", false);
            }
    
    
            $(id).removeClass('medium')
            $(id).removeClass('large')
            $(id).removeClass('largest')
    
            musicPref[i].count--;
    
            if(musicPref[i].count == 0) {
                $(id).addClass('small')
                musicPref.splice(i,1)
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
        }
    })

    $('#reset').on('click',function(){
        musicPref.length = 0
        prefIndex = 0
        maxedOut.length = 0

        $('.click').removeClass('medium')
        $('.click').removeClass('large')
        $('.click').removeClass('largest')

        $(".click").attr("disabled", false);

        $('.click').addClass('small')
    })

    $('#next').on('click',function(){
        //save data to local storage

        //navigate to the next page
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
                    count: 1,
                    index: prefIndex
                }
            )
            prefIndex++;

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


    // function to handled the css
    function circleChange(genre, el) {
        
        function isPicked(picked) {
            return picked.genre === genre;
        }

        var picked = musicPref.find(isPicked);

        if (picked.count == 1) {
            $(el).removeClass("small");
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

