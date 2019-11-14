const client_id = '4429c460396649ee99abf2b6242fadde'; // Our client id

/* Authorization Grant Flow */
let curURL = 'https://weave.cs.nmt.edu/apollo5/prototype/home.html';
let redirect_uri = curURL; // Our redirect uri

var auth_url = 'https://accounts.spotify.com/authorize';
var response_type_code = 'code';
var response_type_token = 'token';

/* IF you ever get a 403 error, check to see if you provided the correctscopes below. */
var scopes = 'user-read-private user-read-recently-played user-library-read user-top-read';// the scopes we are asking the user to agree to.
var state = generateRandomString(16);
var access_token = null;
const spotify_api_url = 'https://api.spotify.com/v1/me';

/**
 * Based on Implicit Grant Flow
 * TODO: USe a form possibly instead of GET request to construct url.
 */
function implicitGrantFlow() {

    $.get( {
        crossDomain: true,
        url: auth_url,
        data: {
            client_id: client_id,
            redirect_uri: redirect_uri,
            scope: scopes,
            response_type: response_type_token,
            state: state
        }
    }).done(function callback(data) {

        /* Redirect user to home page */
        $(location).attr('href', this.url);

    }).fail(function (error) {
        console.log("ERROR HAPPENED: " + error.status);

    })
}

function getAccessToken() {

    if (access_token === null) {

        if (window.location.hash) {
            console.log('Getting Access Token');

            var hash = window.location.hash.substring(1);
            var accessString = hash.indexOf("&");

            /* 13 because that bypasses 'access_token' string */
            access_token = hash.substring(13, accessString);
            console.log(access_token);

        } else {
            console.log('URL has no hash; no access token');
        }
    }

    if (access_token != null) {
        //getUserTopTracks('long_term', '0', '5');
        getRecentlyListenedTracks('5');
    }

}

function getUserProfile() {

    $.get({
        url: 'https://api.spotify.com/v1/me',
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        success: function (response) {
            console.log(response);
        }
    });
}

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
            console.log(response);

            /* Get the items from the response (The limit) tracks. */
            res = JSON.parse(JSON.stringify(response.items));

            /* Get all the track details in the json */
            for (i = 0; i < res.length; i++) {
                console.log("Track: " + res[i]);
            }
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
function getRecentlyListenedTracks(limit, before, after) {

    var tracks = []; // For the tracks.
    var sendArray = 0;

    $.get({
        url: 'https://api.spotify.com/v1/me/player/recently-played',
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        data: {
            limit: limit, // How many tracks to show (50 max @ a time).
            before: before, // UNIX timestamp in ms [All items before timestamp].
            after: after //  UNIX timestamp in ms [All items after timestamp].
        },
        success: function (response) {
            console.log(response);
            var artists = '';

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
        }
    });
}

function getTrackAudioFeatures(trackId) {

    let audioFeatures = [];
    console.log("Track ID: " + trackId);

    $.get({
        url: 'https://api.spotify.com/v1/audio-features/' + trackId,
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        success: function (response) {
            audioFeatures.push(response.danceability);
            audioFeatures.push(response.energy);
            audioFeatures.push(response.speechiness);
            audioFeatures.push(response.acousticness);
            audioFeatures.push(response.instrumentalness);
            audioFeatures.push(response.liveness);
            audioFeatures.push(response.valence);
            console.log(response);
            updateRadarChart(audioFeatures);
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
