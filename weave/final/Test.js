/* Authorization Grant Flow */
var client_id = '4429c460396649ee99abf2b6242fadde'; // Our client id
var redirect_uri = 'https://weave.cs.nmt.edu/apollo5/final/home.html'; // Our redirect uri
var auth_url = 'https://accounts.spotify.com/authorize';
var response_type_token = 'token';

/* Time variables */
const dateNowMS = new Date();  // Time (ms) since EPOCH.
const secondsSinceEpoch = Math.round(dateNowMS.getTime() / 1000);

/* IF you ever get a 403 error, check to see if you provided the correct scopes below. */
var scopes = 'user-read-private user-read-recently-played user-library-read user-top-read';// the scopes we are asking the user to agree to.
var state = generateRandomString(16);
var access_token = null;

/**
 * Based on Implicit Grant Flow
 * TODO: Use a form possibly instead of GET request to construct url.
 * TODO: ASK ABOUT SERVER SIDE Access-Control-Allow-Origin error.
 */
function implicitGrantFlow() {

    /* If access token has been assigned in the past and is not expired, no request required. */
    if (sessionStorage.getItem("accessToken") !== null &&
        sessionStorage.getItem("tokenTimeStamp") !== null) {

        /* Navigate to the home page. */
        $(location).attr('href', "home.html");
    } else {
        console.log("Token expired or never found, getting new token.");
        $.ajax({
            url: auth_url,
            type: 'GET',
            contentType: 'application/json',
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            data: {
                client_id: client_id,
                redirect_uri: redirect_uri,
                scope: scopes,
                response_type: response_type_token,
                state: state
            }
        }).done(function callback(response) {
            /* Redirect user to home page */
            console.log("COULD THIS BE A SUCCESS?");
            $(location).attr('href', this.url);

        }).fail(function (error) {
            /* Since we cannot modify the server, we will always fail. */
            console.log("ERROR HAPPENED: " + error.status);
            $(location).attr('href', this.url);
        });
    }
}

/**
 * The bread and butter to calling the API. This function will be called once the
 * user is redirected to the home page on success and without rejecting the terms
 * we are demanding. Once through, this function parses the url for the access token
 * and then stores it to be used later or when navigating away from the hoe page.
 */
function getAccessToken() {

    access_token = sessionStorage.getItem("accessToken");

    if (access_token === null) {
        if (window.location.hash) {
            console.log('Getting Access Token');

            var hash = window.location.hash.substring(1);
            var accessString = hash.indexOf("&");

            /* 13 because that bypasses 'access_token' string */
            access_token = hash.substring(13, accessString);
            console.log("Access Token: " + access_token);

            /* If first visit or regaining token, store it in session. */
            if (typeof(Storage) !== "undefined") {
                /* Store the access token */
                sessionStorage.setItem("accessToken", access_token); // store token.

                /* To see if we need a new token later. */
                sessionStorage.setItem("tokenTimeStamp", secondsSinceEpoch);

                /* Token expire time */
                sessionStorage.setItem("tokenExpireStamp", secondsSinceEpoch + 3600);
                console.log("Access Token Time Stamp: "
                + sessionStorage.getItem("tokenTimeStamp")
                + " seconds\nOR: " + dateNowMS + "\nToken expires at: "
                + sessionStorage.getItem("tokenExpireStamp"));
            } else {
                alert("Your browser does not support web storage...\nPlease try another browser.");
            }
        } else {
            console.log('URL has no hash; no access token');
        }
    } else {
        console.log("Access Token still valid and not NULL :)");
    }

    if (access_token != null) {
        getUserProfile(); // To load the current user's picture.
        getRecentlyListenedTracks(5); // To display the radar chart & last 5 tracks played.
        getUserLibrary(12, 0); // To display last 10 saved tracks (coverart) on home page.
    }
}

/**
 * Function will recieve a JSON format which tells us some basic information the
 * user has disclosed to Spotify. This function is mainly to load the user's
 * picture they have on Spotify (or from Facebook).
 */
function getUserProfile() {

    var res;

    $.get({
        url: 'https://api.spotify.com/v1/me',
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        success: function (response) {
            var img = document.getElementById("userPicture");
            var loadImg = new Image;
            loadImg.onload = function () {
                img.src = this.src;
            };

            /* Make the images section of the response an object */
            res = JSON.parse(JSON.stringify(response.images));
            loadImg.src = res[0].url;
        },
        fail: function () {
            console.log("getUserProfile(): Failed to get user profile api response. ");
        }
    });
}

/**
 * Function will get the user's top tracks depending on the limit and offset
 * specified in addition to the time_range specified in JSON format.
 * @param time_range short/medium/long range the specifies how long ago.
 * @param offset Where the indexing of top tracks starts.
 * @param limit How many tracks at a time we can fetch (50 max.)
 */
function getUserTopTracks(time_range, offset, limit) {

    $.get({
        url: 'https://api.spotify.com/v1/me/top/tracks',
        headers: {
            'Authorization': 'Bearer ' + access_token,
        },
        data: {
            limit: limit, // This is how many tracks to show (50 max @ a time).
            offset: offset, // 0 = top of list, increase to get more tracks.
            time_range: time_range // short/medium/long_term time ranges.
        },
        success: function (response) {

            /* Get the items from the response (The limit) tracks. */
            res = JSON.parse(JSON.stringify(response.items));

            /* Get all the track details in the json */
            for (i = 0; i < res.length; i++) {
                console.log("Track: " + res[i]);
            }
        },
        fail: function () {
            console.log("getUserTopTracks(): api call failed!");
        }
    });
}

/**
 * Function gets the most recently listened to tracks and sections off the
 * name of the track and artist(s) which is published to home.html.
 * @param {number} limit The number of tracks we want to fetch at a time.
 * @param {number} before in ms, tracks before UNIX timestamp.
 * @param {number} after in ms, tracks after UNIX timestamp.
 */
function getRecentlyListenedTracks(limit, after) {

    var tracks = []; // For the tracks.
    console.log("Limit: " + limit + "\nAfter: " + after);

    $.get({
        url: 'https://api.spotify.com/v1/me/player/recently-played',
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        data: {
            limit: limit, // How many tracks to show (50 max @ a time).
            after: after //  UNIX timestamp in ms [All items after timestamp].
        },
        success: function (response) {
            var artists = '';

            //console.log(response);

            /* Get the items from the response (The limit) tracks. */
            res = JSON.parse(JSON.stringify(response.items));

            /* Parse JSON to section off track name and artists.
               Update home.html with the results. */

            for (i = 0; i < res.length; i++) {
                tracks.push(res[i]);
                for (j = 0; j < res[i].track.artists.length; j++) {
                    /* Do not pout comma after last artist */
                    if (res[i].track.artists.length == 1) {
                        artists = artists.concat(res[i].track.artists[j].name);
                    } else if (res[i].track.artists.length > 1) {
                        if (j == res[i].track.artists.length - 1) {
                            artists = artists.concat(res[i].track.artists[j].name);
                        } else if (j == res[i].track.artists.length - 2) {
                            artists = artists.concat(res[i].track.artists[j].name + " and ");
                        } else {
                            artists = artists.concat(res[i].track.artists[j].name + ", ");
                        }
                    }
                }

                /* Publish to home.html based on id of each element. */
                document.getElementById("last5listened" + [i + 1]).innerHTML = res[i].track.name + " / " + artists;
                artists = ''; // Clear string so other artist aren't copied.
            }
            /* Send first track to get its audio features. */
            getTrackAudioFeatures(tracks[0].track.id);
        },
        fail: function () {
            console.log("getRecentlyListenedTracks(): There are now tracks between these time periods or an error happened.");
        }
    });
}

/**
 * Function will get the user's library so we will get the latest 10 tracks from
 * the user to display their cover art on the home page.
 * @param limit Set to 12 now to display the latest 12 tracks.
 * @param offset Where to start our track offset in the library.
 */
function getUserLibrary(limit, offset) {

    var res;

    $.get ({
        url: 'https://api.spotify.com/v1/me/tracks',
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        data: {
            limit: limit, // How many tracks to show (50 max @ a time).
            offset: offset // Where to start in the user's library (0 = 1st track)
        },
        success: function (response) {

            var i = 0;

            /* Get the items from the response (The limit) tracks. */
            res = JSON.parse(JSON.stringify(response.items));

            for (; i < res.length; i++) {
                /* Update the home page with coverart of latest tracks in library to each class name. */
                document.getElementById("YSM" + (i + 1)).src = res[i].track.album.images[1].url;
            }
        },
        fail: function (res) {
            console.log("getUserLibrary() Failed!: " + res.status);
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
            audioFeatures.push(response.danceability);
            audioFeatures.push(response.energy);
            audioFeatures.push(response.speechiness);
            audioFeatures.push(response.acousticness);
            audioFeatures.push(response.instrumentalness);
            audioFeatures.push(response.liveness);
            audioFeatures.push(response.valence);
            updateRadarChart(audioFeatures);
        },
        fail: function () {
            console.log("getTrackAudioFeatures() failed to get api data...");
        }
    });
}

/**
 * Provided by Spotify Auth guidelines
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
function generateRandomString(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
