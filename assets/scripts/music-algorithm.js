
var googleReady = false;
var spodifyReady = false;

// access token fir spodify
var spodifyAccessToken = "BQC5k9_RcV5u5pIYVXT1Utwe-qiH3dg6wcUT6jqBHdOh-ffaXZqz86vVUkqW0eDfl6GqiLd1yG0sxqDf0gGL3QgFeahLOLJBU1zbMJeyVN7ECSrmsz6oht5rx1C1vGdIpGjTpe5ZJIucBSqOikfxDQhMO-8RBbM";

//google keys
var googleApikey = 'AIzaSyD_Lxn97l1Pe7HVXohJPIojqhqHyuCevF4';
var googleClientID = '308747775295-o6rq28ejtpbmlaj83kth1c05iiajf7dr.apps.googleusercontent.com'

var songName = '';
var artistName = '';


var GoogleAuth;
var SCOPE = 'https://www.googleapis.com/auth/youtube.force-ssl';
function handleClientLoad() {
    // Load the API's client and auth2 modules.
    // Call the initClient function after the modules load.
    gapi.load('client:auth2', initClient);
}

function initClient() {
    // In practice, your app can retrieve one or more discovery documents.
    var discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest';

    // Initialize the gapi.client object, which app uses to make API requests.
    // Get API key and client ID from API Console.
    // 'scope' field specifies space-delimited list of access scopes.
    gapi.client.init({
        'apiKey': googleApikey,
        'clientId': '308747775295-o6rq28ejtpbmlaj83kth1c05iiajf7dr.apps.googleusercontent.com',
        'discoveryDocs': [discoveryUrl],
        'scope': SCOPE
    }).then(function () {
        GoogleAuth = gapi.auth2.getAuthInstance();

        // Listen for sign-in state changes.
        GoogleAuth.isSignedIn.listen(updateSigninStatus);

        // Handle initial sign-in state. (Determine if user is already signed in.)
        var user = GoogleAuth.currentUser.get();
        setSigninStatus();

        // Call handleAuthClick function when user clicks on
        //      "Sign In/Authorize" button.
        $('#sign-in-or-out-button').click(function () {
            handleAuthClick();
        });
        $('#revoke-access-button').click(function () {
            revokeAccess();
        });
    });
}

function handleAuthClick() {
    if (GoogleAuth.isSignedIn.get()) {
        // User is authorized and has clicked "Sign out" button.
        GoogleAuth.signOut();
    } else {
        // User is not signed in. Start Google auth flow.
        GoogleAuth.signIn();
    }
}

function revokeAccess() {
    GoogleAuth.disconnect();
}

function setSigninStatus() {
    var user = GoogleAuth.currentUser.get();
    var isAuthorized = user.hasGrantedScopes(SCOPE);
    if (isAuthorized) {
        $('#sign-in-or-out-button').html('Sign out');
        $('#revoke-access-button').css('display', 'inline-block');
        $('#auth-status').html('You are currently signed in and have granted ' +
            'access to this app.');
        googleReady = true;
        // console.log(gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token)
        getVideo ()
    } else {
        $('#sign-in-or-out-button').html('Sign In/Authorize');
        $('#revoke-access-button').css('display', 'none');
        $('#auth-status').html('You have not authorized this app or you are ' +
            'signed out.');
    }
}

function updateSigninStatus() {
    setSigninStatus();
}



//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------//




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

    $('#next').on('click', function () {
        getSong(getArtist())
    })

    $("#favs").on("click", function () {
        favorites.push($(this).attr("data-songName"));
        localStorage.setItem("favs", JSON.stringify(favorites));
    });
});

//function ajax call connect to API
function getSong(artist) {
    
    var searchArtist = artist

    //get artist id using spodify search api
    $.ajax({
        url: 'https://api.spotify.com/v1/search?q=' + searchArtist + '&type=artist&limit=1',
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + spodifyAccessToken
        },
        success: function (data) {
            var artistID = data.artists.items[0].id
            // console.log(artistID)

            // get related artists using spodify artist api
            $.ajax({
                url: 'https://api.spotify.com/v1/artists/' + artistID + '/related-artists',
                type: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + spodifyAccessToken
                },
                success: function (data) {
                    var randomArtistID = data.artists[Math.floor(Math.random() * data.artists.length)].id
                    $.ajax({
                        url: 'https://api.spotify.com/v1/artists/' + randomArtistID + '/top-tracks?market=us',
                        type: 'GET',
                        headers: {
                            'Authorization': 'Bearer ' + spodifyAccessToken
                        },
                        success: function (data) {
                            var trackSelect = Math.floor(Math.random() * data.tracks.length)
                            console.log(data.tracks[trackSelect])
                            spodifyReady = true;
                            songName = trackSelect.name;
                            artistName = trackSelect.album.artists[0].name;

                            console.log(songName);
                            console.log(artistName);

                            getVideo ()
                        }
                    });

                }
            });

        }
    });
}

function getArtist() {
    var genrePickArray = []
    musicPreferences.forEach(e => {
        for (var i = 0; i < e.count; i++) {
            genrePickArray.push(e.genre)
        }
    })

    // console.log(genrePickArray)

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
        return (null)
    }

    return (pickedArtist)
}

function artistFromObj(genre) {
    return (artists[genre][Math.floor(Math.random() * artists[genre].length)])
}


function getVideo () {
    if (spodifyReady == true && googleReady == true) {
        execute()
    }
}


function execute() {
    return gapi.client.youtube.search.list({
      "q": songName + ' ' + artistName,
      "type": [
        "video"
      ]
    }) .then(function(response) {
        // Handle the results here (response.result has the parsed body).
        console.log("Response", response);
        console.log('videoID',response.result.items[0].id.videoId)
        $('#videoFrame').attr('src','https://www.youtube.com/embed/' + response.result.items[0].id.videoId)
        },
        function(err) { console.error("Execute error", err); 
    });
  }


// GET https://youtube.googleapis.com/youtube/v3/search?q=eminem&type=video&key=[YOUR_API_KEY] HTTP/1.1

// Authorization: Bearer [YOUR_ACCESS_TOKEN]
// Accept: application/json


// https://www.youtube.com/watch?v=