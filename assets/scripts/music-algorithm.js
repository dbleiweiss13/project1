//get data from local storage
var musicPreferences = JSON.parse(localStorage.getItem("prefs"));

var artists = {
    rock: [
        'rolling stones'
    ],
    rap: [
        'Eminem'
    ],
    country: [
        'Willie Nelson'
    ],
    rb: [
        'Drake'
    ],
    pop: [
        'Beyonce'
    ],
    reggae: [
        'Bob Marley'
    ]
}

// console.log(musicPreferences)

$(document).ready(function () {
    //create function to pick genre and related artist of next song 
    // console.log(getArtist());

    //function will return song from artist name
    getSong(getArtist())

    $('#next').on('click',function(){
        getSong(getArtist())
    })

    $("#favs").on("click", function () {
        favorites.push($(this).attr("data-songName"));
        localStorage.setItem("favs", JSON.stringify(favorites));
    });
});

$.ajax({
    url: 'https://www.googleapis.com/youtube/v3/search?q=eminem&type=video',
    type: 'GET'  
}).then( function(response){
    console.log(response)
})

//function ajax call connect to API
function getSong(artist) {
    var accessToken = "BQBbkOf34lS1abRoKOQly3HCjfIufJatO5kag0urGP26_tjG12sKEiL6gL9c2kMr_vFdWr5hKMhE1EFFoEKNqH8h_MLSxFoE-DJAD9hVJcpy-61Gy27YojBWAPFxoFFkaz1lKeRgC6moIrp9c6zFnHj-6WPb1qw";

    var searchArtist = artist

    //get artist id using spodify search api
    $.ajax({
        url: 'https://api.spotify.com/v1/search?q=' + searchArtist + '&type=artist&limit=1',
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (data) {
            var artistID = data.artists.items[0].id
            // console.log(artistID)

            // get related artists using spodify artist api
            $.ajax({
                url: 'https://api.spotify.com/v1/artists/' + artistID + '/related-artists',
                type: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                success: function (data) {
                    var randomArtistID = data.artists[Math.floor(Math.random() * data.artists.length)].id
                    $.ajax({
                        url: 'https://api.spotify.com/v1/artists/' + randomArtistID + '/top-tracks?market=us',
                        type: 'GET',
                        headers: {
                            'Authorization': 'Bearer ' + accessToken
                        },
                        success: function (data) {
                            var trackSelect = Math.floor(Math.random() * data.tracks.length)
                            console.log(data.tracks[trackSelect])
                        }
                    });

                }
            });

        }
    });
}

function getArtist () {
    var genrePickArray = []
    musicPreferences.forEach(e => {
        for(var i = 0; i < e.count; i++) {
            genrePickArray.push(e.genre)
        }
    })

    console.log(genrePickArray)

    var genreRand = genrePickArray[Math.floor(Math.random() * genrePickArray.length)]
    var pickedArtist = ''

    if (genreRand == 'Rock') {
        pickedArtist = artistFromObj('rock')
    }
    else if (genreRand == 'Country') {
        pickedArtist = artistFromObj('country')
    }
    else if (genreRand == 'Rap') {
        pickedArtist = artistFromObj('rap')
    }
    else if (genreRand == 'R&B') {
        pickedArtist = artistFromObj('rb')
    }
    else if (genreRand == 'Pop') {
        pickedArtist = artistFromObj('pop')
    }
    else if (genreRand == 'Reggae') {
        pickedArtist = artistFromObj('reggae')
    }
    else {
        console.log('error picking artist')
        return(null)
    }

    return(pickedArtist)
}

function artistFromObj (genre) {
    return(artists[genre][Math.floor(Math.random() * artists[genre].length)])
}


var genres = ['Rock', 'Country', 'Rap', 'R&B', 'Pop', 'Reggae'];

//store history


//store favorites





// window.onSpotifyWebPlaybackSDKReady = () => {
//     const token = 'BQDsDC5WqWvf7QvxonS12-hq6DXLlmQkGnawFxDovG99LBMDRA3z50d0Evy9dryG3_bqAkYJcTY-JDJ9vPeCzY3GN015GqASfK2Q8OB6DGAu43yH6AgT3RQdCZR9myJVCHelhciNpb_c0lbeXvyJAJqrr_pKeG-dmOaE-A8lWvSW4pu2u1w';
//     const player = new Spotify.Player({
//       name: 'Web Playback SDK Quick Start Player',
//       getOAuthToken: cb => { cb(token); }
//     });

//     // Error handling
//     player.addListener('initialization_error', ({ message }) => { console.error(message); });
//     player.addListener('authentication_error', ({ message }) => { console.error(message); });
//     player.addListener('account_error', ({ message }) => { console.error(message); });
//     player.addListener('playback_error', ({ message }) => { console.error(message); });

//     // Playback status updates
//     player.addListener('player_state_changed', state => { console.log(state); });

//     // Ready
//     player.addListener('ready', ({ device_id }) => {
//       console.log('Ready with Device ID', device_id);
//     });

//     // Not Ready
//     player.addListener('not_ready', ({ device_id }) => {
//       console.log('Device ID has gone offline', device_id);
//     });

//     // Connect to the player!
//     player.connect();




//   };