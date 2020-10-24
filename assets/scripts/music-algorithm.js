var favorites = [];

var genreIds = {
    Rock: "0C0XlULifJtAgn6ZNCW2eu",
    Country: "32vWCbZh0xZ4o9gkz4PsEU",
    Rap: "7dGJo4pcD2V6oG8kP0tJRR",
    R_and_B: "6vWDO969PvNqNYHIOW5v0m",
    Pop: "5o723EMxNulM5ydXRh7Qkk",
    Reggae: "2QsynagSdAqZj3U9HgDzjD"
};

function onLoad() {
    var accessToken = "BQAA18qHArTOf_OOk9mF5QbDdWzDYp1SwoGVHUXKEqPDE8wty6j9xBmf_wwswqKNBXe6jbbfHrLtEPY6bf5WKrM1J_nY6vOUAcJsq_NjmCU-p_sxGbL0l4QvOBcjipg01OUZ98A_jQDtj7LVx1WKMSh9nrZanxj5ihJtk2HBvMs0BUIITQkQsTvWDZz9ENzql-I9kM8B0U71etW-sVO89xC68OOpzvXbSNTe59H6eGQH1BAJaPxEpQOp-NXQQG8"
    var arr = JSON.parse(localStorage.getItem("prefs"));
    
    var genre = arr[Math.floor(Math.random() * arr.length)].genre;
    var id = genreIds[genre];

    $.ajax({
        url: 'https://api.spotify.com/v1/artists/' + id + '/related-artists',
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (data) {
            console.log(data);
        }
    });
}

// call this on its own using document.ready
$(document).ready(onLoad);

// rest of the app runs inside this document.ready
$(document).ready(function () {
    $("#favs").on("click", function () {
        favorites.push($(this).attr("data-songName"));
        localStorage.setItem("favs", JSON.stringify(favorites));
    });
});

