$(document).ready(function () {
    // play song function 
    // function play() {
    //     var playButton = $("#playBtn");

    // }
    var playButton = $('#playBtn');
    var pauseButton = $("#pauseBtn");

    playButton.on('click', function () {
        playButton.addClass("hide");
        pauseButton.removeClass("hide");
        //function to play song
    });

    pauseButton.on("click", function () {
        pauseButton.addClass("hide");
        playButton.removeClass("hide");
        // function to pause song
    });




    // fast forward functionality
    //   var fastButton = $("#fastBtn");

    //   $(".music-container").toggleClass("")

    // favorite button
    // info from current song will be saved in local storage and saved as object and displayed in card div for the user
    // var favSongs = [];
    // favSongs[0]= prompt("Save to favorites?");
    var favButton = $("#favBtn");
    var favSongs = JSON.parse(localStorage.getItem("favSongs"));
    if (favSongs == null) {
        favSongs = [];
    }


    favButton.on("click", function () {
        // var favSongs = [];
        // var newFavSong = localStorage.setItem("favSongs", JSON.stringify($(".artist-name")));
        var newFavSong = $(".artist-name").text();
        favSongs.push(newFavSong);
        localStorage.setItem("favSongs", JSON.stringify(favSongs));

        // local storage function works however we arent allowed to use confirms,alerts, or prompts, so no idea how to use this for now without woring API

    });




});





