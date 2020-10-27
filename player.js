$(document).ready(function() {
    // play song function 
    // function play() {
    //     var playButton = $("#playBtn");

    // }
    var playButton = $('#playBtn');
    var pauseButton = $("#pauseBtn");
    
    playButton.on('click', function() {
        playButton.addClass("hide");
        pauseButton.removeClass("hide");
        //function to play song
    });

    pauseButton.on("click", function(){
        pauseButton.addClass("hide");
        playButton.removeClass("hide");
        // function to pause song
    }); 




      // fast forward functionality
    //   var fastButton = $("#fastBtn");

    //   $(".music-container").toggleClass("")

    // favorite button
    var favButton = $("#favBtn");

    favButton.on("click", function(){
        
    });



  });





