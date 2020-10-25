//get data from local storage


//create function to pick genre of next song 
var pref = [
    { genre: "Rock", count: 1, index: 0 },
    { genre: "Country", count: 3, index: 1 },
    { genre: "Rap", count: 1, index: 2 }
]

// var queryURL = "https://api.spotify.com/v1/search?q=%22rap%22&type=playlist?api_key=BQB_UhyW12quPmC8F4J9rCwGFobq2MBdOKevI8k08sUt_fpO_Z86rbpitD-HAQ3KmLu1FcwfjZ9Y2vALO61HaCnLg4rIxbGRkuI8zu_9ZGSIGnlVn0qwFHwqOWDtwrbLZqzLs2z6LdwqcN04jdt8I5FW3PGVQcA";

// //
// $.ajax({
//     url: queryURL,
//     method: "GET"
// }).then(function(response) {
//     console.log(response)
// }
var searchArtist = 'rolling stones'

var accessToken = "BQCcAXQhoh5KB1VxbH2mSNuTTRbSL5Ny4MRsfjhpDG_CrqVkDuXXHWaKq6oZHrwQ5pxUf7sd5ajjlcEABDkgkudNw5iKi49MYh_0rLHgwmdG1WZ1khdUAXTOe8-YatEvKJ0er4ZQm_NPotj4ZzKRlMDrNVV1R8I";
$.ajax({
    url: 'https://api.spotify.com/v1/search?q=' + searchArtist + '&type=artist&limit=1',
    type: 'GET',
    headers: {
        'Authorization': 'Bearer ' + accessToken
    },
    success: function (data) {
        var artistID = data.artists.items[0].id
        console.log(artistID)
        $.ajax({
            url: 'https://api.spotify.com/v1/artists/' + artistID + '/top-tracks?market=us',
            type: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            success: function (data) {
                var trackSelect = Math.floor(Math.random() * data.tracks.length)
                console.log(data.tracks[trackSelect])
            }

            // url: 'https://api.spotify.com/v1/artists/' + artistID + '/albums',
            // type: 'GET',
            // headers: {
            //     'Authorization': 'Bearer ' + accessToken
            // },
            // success: function (data) {
            //     var albumSelect = Math.floor(Math.random() * data.items.length)
            //     var albumId = data.items[albumSelect].id
            //     console.log(albumId)
            //     $.ajax({
            //         url: 'https://api.spotify.com/v1/albums/' + albumId,
            //         type: 'GET',
            //         headers: {
            //             'Authorization': 'Bearer ' + accessToken
            //         },
            //         success: function (data) {
            //             console.log(data)
                        
        
            //         }
            //     });

            // }
        });

    }
});

//function ajax call connect to API


//store history


//store favorites