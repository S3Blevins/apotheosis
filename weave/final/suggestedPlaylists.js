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
            suggestUserPlaylists(5, 5);

    } else {
        console.log("Getting a new acess token...Redirecting");
        /* Remove session vars so we dont have to check in implicitGrantFlow */
        sessionStorage.clear();

        $(location).attr('href', 'index.html'); // Get another access token, redirect back.
    }
}
