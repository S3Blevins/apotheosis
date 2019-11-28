/* Time variables */
const dateNowMS = new Date();  // Time (ms) since EPOCH.
const secondsSinceEpoch = Math.round(dateNowMS.getTime() / 1000);

const tokenSecOld = sessionStorage.getItem("tokenTimeStamp");
const tokenExpireSec = sessionStorage.getItem("tokenExpireStamp");

const upTokenTime = parseInt(tokenSecOld) + (secondsSinceEpoch - parseInt(tokenSecOld));

/* Api stuff */
var access_token = sessionStorage.getItem("accessToken");
console.log("access token: " + access_token);

function callFunctions() {
    if (sessionStorage.getItem("accessToken") !== null &&
        sessionStorage.getItem("tokenTimeStamp") !== null &&
        upTokenTime < tokenExpireSec) {
            var timeLeft = (tokenExpireSec - upTokenTime);
            console.log("Token still valid: " + Math.floor(timeLeft / 60) + " minutes left.");

            /* Call functions here */
            userTopTrack();
            userTopGenres();
            userTopMood();

    } else {
        console.log("Getting a new acess token...Redirecting");
        /* Remove session vars so we dont have to check in implicitGrantFlow */
        sessionStorage.clear();

        $(location).attr('href', 'index.html'); // Get another access token, redirect back.
    }
}

function userTopTrack() {
    $.get({
        url: 'https://api.spotify.com/v1/me/top/tracks',
        headers: {
            'Authorization': 'Bearer ' + access_token,
        },
        data: {
            limit: 1, // This is how many tracks to show (50 max @ a time).
            time_range: 'long_term' // long_term time range to get favorite track.
        },
        success: function (response) {
            /* Get the items from the response (The limit) tracks. */
            res = JSON.parse(JSON.stringify(response.items));

            /* Get all the track details in the json */
            getTrackAudioFeatures(res[0].id);
        },
        fail: function () {
            console.log("getUserTopTracks(): api call failed!");
        }
    });
}


/**
 * Function will get audio features for a track (danceability, valence, etc) to then
 * populate the radar graph on the home screen and be used for other applications.
 * @param trackId unique identifier created by Spotify used from JSON fetch.
 */
function getTrackAudioFeatures(trackId) {

    var audioFeatures = [];

    $.get({
        url: 'https://api.spotify.com/v1/audio-features/' + trackId,
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        success: function (response) {
            /* These are the values that will be published on the radar chart. */
            audioFeatures.push(parseFloat(response.danceability).toFixed(2));
            audioFeatures.push(parseFloat(response.energy).toFixed(2));
            audioFeatures.push(parseFloat(response.speechiness).toFixed(2));
            audioFeatures.push(parseFloat(response.acousticness).toFixed(2));
            audioFeatures.push(parseFloat(response.instrumentalness).toFixed(2));
            audioFeatures.push(parseFloat(response.liveness).toFixed(2));
            audioFeatures.push(parseFloat(response.valence).toFixed(2));
            updateRadarChart(audioFeatures);
        },
        fail: function () {
            console.log("getTrackAudioFeatures() failed to get api data...");
        }
    });
}

function userTopGenres() {

    var artistIds = [];

    $.get({
        url: 'https://api.spotify.com/v1/me/top/tracks',
        headers: {
            'Authorization': 'Bearer ' + access_token,
        },
        data: {
            limit: 50, // This is how many tracks to show (50 max @ a time).
            time_range: 'long_term' // long_term time range to get favorite track.
        },
        success: function (response) {
            //console.log(response);
            /* Get the items from the response (The limit) tracks. */
            res = JSON.parse(JSON.stringify(response.items));

            /* Get the artists ids (even multiple artist on a track). */
            for (i = 0; i < res.length; i++) {
                for (j = 0; j < res[i].artists.length; j++) {
                    /* Spotify api limits 50 ids at a time. */
                    if (artistIds.length == 50) {
                        break;
                    }

                    artistIds.push(res[i].artists[j].id);
                }
            }

            publishGenresChart(artistIds);
        },
        fail: function () {
            console.log("getUserTopTracks(): api call failed!");
        }
    });
}

function publishGenresChart(artistIds) {

    var genres = []; // store an array of objects.
    var artistIdsString = ""; // The query constructed of artis ids.
    var j = 0;

    /* populate id string for query */
    for (i = 0; i < artistIds.length; i++) {
        if (i + 1 === artistIds.length) {
            artistIdsString += artistIds[i];
        } else {
            artistIdsString += artistIds[i] + ",";
        }
    }

    $.get({
        url: 'https://api.spotify.com/v1/artists/',
        headers: {
            'Authorization': 'Bearer ' + access_token,
        },
        data: {
            ids: artistIdsString
        },
        success: function (response) {

            //console.log(response);
            var res = JSON.parse(JSON.stringify(response.artists))
            for (i = 0; i < res.length; i++) {
                for (j = 0; j < res[i].genres.length; j++) {

                    /* If the array is empty, no genre defined; skip */
                    if (res[i].genres.length != 0) {

                        var newGenre = new Object();
                        newGenre.name = res[i].genres[j];
                        newGenre.count = 1;
                        genres.push(newGenre);
                    }
                }
            }

            //console.log("genres array");
            //console.log(genres);

            genres.sort(function(a, b){
                return a.name === b.name ? 0 : a.name < b.name ? -1 : 1;
            });

            recheck(genres);

            genres.sort(function(a, b){
                return a.count === b.count ? 0 : a.count < b.count ? -1 : 1;
            }).reverse();

            var genresName = [];
            var genresCount = [];

            for (i = 0; i < 12; i++) {
                genresName.push(genres[i].name);
                genresCount.push(genres[i].count);
            }

            updateGenresChart(genresName, genresCount);

        },
        fail: function () {
            console.log("getArtistsIdInformation api call failed!");
        }
    });
}


/* Use recurrsion? */
function recheck(array) {

    var filtered = 0;
    do {
        var i = 0;
        entered = 0;

        while (i < array.length) {
            if (array[i + 1] != undefined) {
                if (array[i].name == array[i+1].name) {
                    entered = 1;
                    array[i].count++;
                    //console.log("Removing: " + array[i+1].name);
                    array.splice(i+1, 1);
                }
            }
            i++;
        }
        if (entered == 0) {
            filtered = 1;
        }
    } while (filtered == 0);
}

function userTopMood() {

    var trackIds = [];

    $.get({
        url: 'https://api.spotify.com/v1/me/top/tracks',
        headers: {
            'Authorization': 'Bearer ' + access_token,
        },
        data: {
            limit: 50, // This is how many tracks to show (50 max @ a time).
            time_range: 'long_term' // long_term time range to get favorite track.
        },
        success: function (response) {
            //console.log(response);
            /* Get the items from the response (The limit) tracks. */
            res = JSON.parse(JSON.stringify(response.items));

            /* Get the artists ids (even multiple artist on a track). */
            for (i = 0; i < res.length; i++) {
                /* Spotify api limits 50 ids at a time. */
                trackIds.push(res[i].id);
            }

            getValence(trackIds);
        },
        fail: function () {
            console.log("getUserTopTracks(): api call failed!");
        }
    });
}

function getValence(trackIds) {

    var trackValence = [];        // The # of tracks that follow the filters.
    var trackIdsString = "";     // The query constructed of artis ids.
    var euphoric = 0;           // 100-90
    var happy = 0;             //  89 - 70
    var neutral = 0;          // 69 - 50
    var discouraging = 0;    // 49-30
    var despressing = 0;    // 29 - 11
    var youOkay = 0;       // 10-0

    /* populate id string for query */
    for (i = 0; i < trackIds.length; i++) {
        if (i + 1 === trackIds.length) {
            trackIdsString += trackIds[i];
        } else {
            trackIdsString += trackIds[i] + ",";
        }
    }

    $.get({
        url: 'https://api.spotify.com/v1/audio-features',
        headers: {
            'Authorization': 'Bearer ' + access_token,
        },
        data: {
            ids: trackIdsString
        },
        success: function (response) {
            //console.log(response);
            /* Get the items from the response (The limit) tracks. */
            res = JSON.parse(JSON.stringify(response.audio_features));

            /* Get the artists ids (even multiple artist on a track). */
            for (i = 0; i < res.length; i++) {

                /* Filter the results ito respective arrays. */
                if (parseFloat(res[i].valence).toFixed(2) <= 1.00
                    && parseFloat(res[i].valence).toFixed(2) >= 0.90) {
                    euphoric++;
                } else if (parseFloat(res[i].valence).toFixed(2) < 0.90
                    && parseFloat(res[i].valence).toFixed(2) >= 0.70) {
                    happy++;
                } else if (parseFloat(res[i].valence).toFixed(2) < 0.70
                    && parseFloat(res[i].valence).toFixed(2) >= 0.50) {
                    neutral++;
                } else if (parseFloat(res[i].valence).toFixed(2) < 0.50
                    && parseFloat(res[i].valence).toFixed(2) >= 0.30) {
                    discouraging++;
                } else if (parseFloat(res[i].valence).toFixed(2) < 0.30
                    && parseFloat(res[i].valence).toFixed(2) >= 0.11) {
                    despressing++;
                } else {
                    youOkay++;
                }
            }

            trackValence.push(euphoric);
            trackValence.push(happy);
            trackValence.push(neutral);
            trackValence.push(discouraging);
            trackValence.push(despressing);
            trackValence.push(youOkay);

            updateMoodsChart(trackValence);
        },
        fail: function () {
            console.log("getUserTopTracks(): api call failed!");
        }
    });


}
