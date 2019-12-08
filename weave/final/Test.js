/* Authorization Grant Flow */
var client_id = '4429c460396649ee99abf2b6242fadde'; // Our client id
var redirect_uri = 'https://weave.cs.nmt.edu/apollo5/final/home.jsp'; // Our redirect uri
var auth_url = 'https://accounts.spotify.com/authorize';
var response_type_token = 'token';

/* Time variables */
const dateNowMS = new Date();  // Time (ms) since EPOCH.

const startOfDayLocalMS = new Date().setHours(0, 0, 0, 0);
const endOfDayLocalMS = new Date().setHours(23, 59, 59, 999);
const secondsSinceEpoch = Math.round(dateNowMS.getTime() / 1000);
const tokenSecOld = sessionStorage.getItem("tokenTimeStamp");
const tokenExpireSec = sessionStorage.getItem("tokenExpireStamp");
const upTokenTime = parseInt(tokenSecOld) + (secondsSinceEpoch - parseInt(tokenSecOld));

/* getRecentlyListenedTracks() */
var numTracksToday = 0;     // How many tracks have been listened to today.
var secsListened = 0.0;    // How many seconds have been listened to today.
var lastTrackListen = []; // To have a ref to the last track.
var lastRes = null;      // Hold reference to last response.
var skip = 0;           // Will denote if the last pull was null or not.
var artistsArray = []; //

/* IF you ever get a 403 error, check to see if you provided the correct scopes below. */
/* The scopes we are asking the user to agree to. */
var scopes = 'user-read-private ' +
             'user-read-recently-played ' +
             'user-library-read ' +
             'user-top-read ' +
             'playlist-read-private';

var state = generateRandomString(16);
var access_token = null;

/**
 * Based on Implicit Grant Flow
 * TODO: Use a form possibly instead of GET request to construct url.
 */
function implicitGrantFlow() {

    /* If access token has been assigned in the past and is not expired, no request required. */
    if (sessionStorage.getItem("accessToken") !== null &&
        sessionStorage.getItem("tokenTimeStamp") !== null &&
        upTokenTime < tokenExpireSec) {
            var timeLeft = (tokenExpireSec - upTokenTime);
            console.log("Token still valid: " + Math.floor(timeLeft / 60) + " minutes left.");

            /* Navigate to the home page. */
            $(location).attr('href', "home.jsp");
    } else {
        console.log("Token expired or never found, getting new token.");
        $.ajax({
            url: auth_url,
            type: 'GET',
            contentType: 'application/json',
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
            console.log(this.url);
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
    } else if (upTokenTime >= tokenExpireSec) {
        console.log("Getting a new acess token...Redirecting");

        /* Remove session vars so we dont have to check in implicitGrantFlow */
        sessionStorage.clear();

        $(location).attr('href', 'index.html'); // Get another access token, redirect back.

    } else {
        var timeLeft = (tokenExpireSec - upTokenTime);
        console.log("Token still valid: " + Math.floor(timeLeft / 60) + " minutes left.");
    }

    if (access_token != null) {
        getUserProfile(); // To load the current user's picture.
        getRecentlyListenedTracks(50, startOfDayLocalMS, null); // To display the radar chart & see at least 50 tracks played.
        getUserLibrary(48, 0); // To display last 48 saved tracks (coverart) on home page.
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
            //console.log(response);
            var img = document.getElementById("userPicture");
            var loadImg = new Image;
            loadImg.onload = function () {
                img.src = this.src;
            };

            /* Make the images section of the response an object */
            res = JSON.parse(JSON.stringify(response.images));

            /* Check to see if there is a user profile picture. */
            if(res.length > 0) {
                loadImg.src = res[0].url;
            } else {
              loadImg.src = "media/empty-profile.png";
            }


            /* Get the user's name and display it. */
            if (response.display_name != null) {
                document.getElementById("userName").innerHTML
                                                    += response.display_name;

            } else {
                document.getElementById("userName").innerHTML += "User";
            }

            /* Get the user's unique ID to be used to store into database */
            sessionStorage.setItem("userID", response.id);

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

// gmail: cse321spotify@gmail.com      password: cse321spotify()

/**
 * Function gets the most recently listened to tracks and sections off the
 * name of the track and artist(s) which is published to home.html.
 * @param {number} limit The number of tracks we want to fetch at a time.
 * @param {number} after in ms, tracks after UNIX timestamp.
 */
function getRecentlyListenedTracks(limit, after) {

    $.get({
        url: 'https://api.spotify.com/v1/me/player/recently-played',
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        data: {
            limit: limit,    // How many tracks to show (50 max @ a time).
            after: after   // The tracks played after this EPOCH timestamp
        },
        success: function (response) {
            console.log(response);
            var artists = '';
            var firstArtist = '';
            var res;

            lastRes = response;
            /* Get the items from the response (The limit) tracks. */
            res = JSON.parse(JSON.stringify(lastRes.items));
            lastRes = response; // This means replace the whole old resp.

            for (i = 0; i < res.length; i++) {
                secsListened += res[i].track.duration_ms;
                for (j = 0; j < res[i].track.artists.length; j++) {
                    /* Do not put comma after last artist */
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

                /* Publish first artist(s) info next to the radar chart.
                   The second check ensures we only publish the last
                   fetch deatils and not mutliple images during each fetch. */
                if (i == 0) {
                    lastTrackListen[0] = res[0].track.id;
                    lastTrackListen[1] = artists;
                }

                /* Publish to home.jsp based on id of each element that are
                   clickable and interactable. */
                if (i < 5) {
                    //document.getElementById("last5listened" + (i + 1)).innerHTML
                    //                        = artistsArray[i];
                    document.getElementById("last5listened" + (i + 1)).innerHTML
                                            = res[i].track.name + " / " + artists;
                    document.getElementById("last5listened" + (i + 1)).target
                                            = "_blank";
                    document.getElementById("last5listened" + (i + 1)).href
                                            = res[i].track.external_urls.spotify;
                    //artistsArray[i] = res[i].track.name + " / " + artists;
                    artists = ''; // Clear string so other artist aren't copied.
                }
            }
 
            if (response.items.length > 0) {

                document.getElementById("LPT").src
                                    = res[0].track.album.images[1].url;
                document.getElementById("LPTA").href
                                    = res[0].track.external_urls.spotify;
                document.getElementById("last-track-title").innerHTML
                                    = res[0].track.name;
                document.getElementById("last-track-artist").innerHTML
                                    += lastTrackListen[1];
                document.getElementById("last-track-date").innerHTML
                                    += res[0].track.album.release_date;

                /* Update the number of tracks played today. */
                numTracksToday = res.length;

                /* Send first track to get its audio features and publish
                   Stats to home page. */
                document.getElementById("numTracksToday").innerHTML += numTracksToday + " tracks today!!!";
                var eclipseTime = 7.31;
                document.getElementById("numMinutesToday").innerHTML +=
                    (((secsListened / 1000) / 60) / eclipseTime).toFixed(1) +
                    " longest eclipses have passed.";

                if (numTracksToday == 0) {
                    getTrackAudioFeatures(null);
                    document.getElementById("last-track-title").innerHTML
                                        = "Play a Track!";
                    document.getElementById("last-track-artist").innerHTML
                                        += "Play a Track!";
                    document.getElementById("last-track-date").innerHTML
                                        += "Play a Track!";
                } else {
                    getTrackAudioFeatures(lastTrackListen[0]);
                }
            } else {
                document.getElementById("LPT").src
                                    = "media/empty-profile.png";
                document.getElementById("last-track-title").innerHTML
                                    = "Play a Track!";
                document.getElementById("last-track-artist").innerHTML
                                    += "Play a Track!";
                document.getElementById("last-track-date").innerHTML
                                    += "Play a Track!";
                getTrackAudioFeatures(null);
            }
        },
        fail: function (error) {
            console.log("getRecentlyListenedTracks(): There are now tracks between these time periods or an error happened.");
        }
    });
}

/**
 * Function will get the user's library so we will get the latest 48 tracks from
 * the user to display their cover art on the home page.
 * @param {number} limit Set to 12 now to display the latest 12 tracks.
 * @param {number} offset Where to start our track cursor in the library.
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
            //console.log(response);
            /* Get the items from the response (The limit) tracks. */

            if (response.items.length > 0) {
                res = JSON.parse(JSON.stringify(response.items));

                /* Show all items from this pull of 50 playlists */
                for (i = 0; i < res.length; i++) {
                    /* Need to create a new element every iteration. */
                    const aTag = document.createElement('a');
                    const divTag = document.createElement('div');
                    const imgTag = document.createElement('img');

                    /* Set static attributes. */
                    aTag.setAttribute('target', "_blank");
                    aTag.setAttribute('class', "thumbnail");
                    divTag.setAttribute('class', "col-xs-3 col-md-2");

                    /* Set dynamic attributes. */
                    /* Get url to redirect to. */
                    aTag.setAttribute('href', res[i].track.external_urls.spotify);
                    imgTag.setAttribute('src', res[i].track.album.images[0].url);
                    imgTag.setAttribute('alt', "media/apotheosis_coverart.png");

                    /* Populate div w/ playlists. */
                    aTag.appendChild(imgTag);
                    divTag.appendChild(aTag);
                    document.getElementById('YLST').appendChild(divTag);
                }
            } else {

                /* If no tracks saved, display a message. */
                const divTag = document.createElement('div');
                divTag.innerHTML = "You have no saved tracks, go add some!";
                document.getElementById('YLST').appendChild(divTag);
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
 * @param {string} trackId unique identifier created by Spotify used from JSON fetch.
 */
function getTrackAudioFeatures(trackId) {

    var audioFeatures = [];

    if (trackId != null) {
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
    } else {
        /* Diplay default data since nothing can populate from api */
        updateRadarChart(['0.3', '0.5', '0.6', '0.7', '0.4', '0.8', '0.9']);
    }
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
