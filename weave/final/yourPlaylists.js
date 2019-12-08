/* Time variables */
const dateNowMS = new Date();  // Time (ms) since EPOCH.
const secondsSinceEpoch = Math.round(dateNowMS.getTime() / 1000);

const tokenSecOld = sessionStorage.getItem("tokenTimeStamp");
const tokenExpireSec = sessionStorage.getItem("tokenExpireStamp");

const upTokenTime = parseInt(tokenSecOld) + (secondsSinceEpoch - parseInt(tokenSecOld));

/* Api stuff */
var access_token = sessionStorage.getItem("accessToken");
console.log("access token: " + access_token);

function callFunctions(genreList, tagList) {
    if (sessionStorage.getItem("accessToken") !== null &&
        sessionStorage.getItem("tokenTimeStamp") !== null &&
        upTokenTime < tokenExpireSec) {
            var timeLeft = (tokenExpireSec - upTokenTime);
            console.log("Token still valid: " + Math.floor(timeLeft / 60) + " minutes left.");

            /* Call functions here */
            getUserPlaylists('null', 0, 5);

            // iterate through the genres, not counting the last empty element
            // if a category for the genre exists, it will be added to the suggestions
            for(var i = 0; i < genreList.length - 1; i++) {
              suggestUserPlaylists(5, genreList[i]);
            }

            // iterate through the tags, not counting the last empty element
            // if a category for the category exists, it will be added to the suggestions
            for(var i = 0; i < tagList.length - 1; i++) {
              suggestUserPlaylists(5, tagList[i]);
            }


    } else {
        console.log("Getting a new acess token...Redirecting");
        /* Remove session vars so we dont have to check in implicitGrantFlow */
        sessionStorage.clear();

        $(location).attr('href', 'index.html'); // Get another access token, redirect back.
    }
}

/**
 * Function will get the playlists coverart that the user has and will allow
 * the user to click on the pictures to be redirected to each playlist.
 * @param {string} next The next api url to the next fetched data.
 * @param {number} offset Where the cursor will start to read playlists.
 * @param {limit} limit Used to update the offset on the next call (if it exists).
 */
function getUserPlaylists(next, offset, limit) {

    $.get({
        url: 'https://api.spotify.com/v1/me/playlists',
        headers: {
            'Authorization': 'Bearer ' + access_token,
        },
        data: {
            limit: limit, // How many playlists to show (50 max @ a time).
            offset: offset // Where to start the fetch cursor.
        },
        success: function (response) {
            //console.log(response);

            /* If there are saved playlists, show them */
            if (response.items.length > 0) {
                /* Get the items from the response (The limit) tracks. */
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
                    aTag.setAttribute('href', res[i].external_urls.spotify);
                    imgTag.setAttribute('src', res[i].images[0].url);

                    /* Populate div w/ playlists. */
                    aTag.appendChild(imgTag);
                    divTag.appendChild(aTag);
                    document.getElementById('YP').appendChild(divTag);
                }

                /* Make another api call since there are more playlists to fetch */
                if (response.next != null) {
                    getUserPlaylists(response.next, (offset + limit), limit);
                }
            } else {

                /* If no playlists saved, display a message. */
                const divTag = document.createElement('div');
                divTag.innerHTML = "You have no saved playlists, go add some!";
                document.getElementById('YP').appendChild(divTag);
            }
        },
        fail: function () {
            console.log("getUserPlaylists(): api call failed!");
        }
    });
}

 function suggestUserPlaylists(offset, category) {

     $.get({
         url: 'https://api.spotify.com/v1/browse/categories/' + category + '/playlists',
         headers: {
             'Authorization': 'Bearer ' + access_token,
         },
         data: {
             country: 'US',
             limit: 5, // How many playlists to show (50 max @ a time).
             offset: offset // Where to start the fetch cursor.
         },
         success: function (response) {

             /* If there are saved playlists, show them */
             if (response.playlists.items.length > 0) {
                 /* Get the items from the response (The limit) tracks. */
                 res = JSON.parse(JSON.stringify(response.playlists.items));

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
                     aTag.setAttribute('href', res[i].external_urls.spotify);
                     imgTag.setAttribute('src', res[i].images[0].url);

                     /* Populate div w/ playlists. */
                     aTag.appendChild(imgTag);
                     divTag.appendChild(aTag);
                     document.getElementById('SP').appendChild(divTag);
                 }

             } else {

                 /* If no playlists saved, display a message. */
                 const divTag = document.createElement('div');
                 divTag.innerHTML = "You need to add some settings to your Apotheosis account!";
                 document.getElementById('SP').appendChild(divTag);
             }
         },
         fail: function () {
             console.log("suggestUserPlaylists(): api call failed!");
         }
     });
 }
