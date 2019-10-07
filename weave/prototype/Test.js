var client_id = '4429c460396649ee99abf2b6242fadde'; // Your client id
var redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri

var auth_url = 'https://accounts.spotify.com/authorize';
var response_type = 'code';
var state = generateRandomString(16);

var scopes = 'user-read-private&';// the scopes we are asking the user to agree to.


function authorizeUser() {
    var url = auth_url + '?client_id=' + client_id + '&response_type=' +
        response_type + '&redirect_uri=' + redirect_uri + '&scope=' +
        scopes + '&state=' + state;
    document.write(url);
}

/**
 * Provided by Spotify Auth guidelines
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

/* Example auth url: https://accounts.spotify.com/authorize?client_id=4429c460396649ee99abf2b6242fadde
&response_type=code&redirect_uri=http://localhost:8084/WebApplication2/&scope=user-read-private&state=34fFs29kd09 */
