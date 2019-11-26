/**
 * @file LastListened.js
 * The source code of the radar graph that powers the LastListened to track audio features graph.
 *
 * @todo add hover attribute (number corresponding to each attribute.)
 */


var chart = document.getElementById('LastListened').getContext('2d');

/**
 * The Very first chart the user is prompted to showing the last track
 * they listened to audio analysis.
 */
var massPopChart = new Chart(chart, {
    type: 'radar', // bar, horizontal, pie, line, donut, radar, polar charts supported
    data: {
        labels: ['danceability', 'energy', 'key', 'loudness', 'mode',
            'speechiness', 'acousticness', 'instrumentalness', 'liveness', 'valence',
            'tempo'],
        datasets: [
            {
                data: [1.0, 0.6, 0.8, 0.39, 0.55, 0.54, 0.72, 0.84, 0.67, 0.45, 0.79],
                label: 'Last Listened Track Audio Features',
                backgroundColor: 'rgb(31, 40, 51, 0.25)',
                borderColor: '#1f2833',
                borderWidth: 2,
                fill: true,
                hoverBackgroundColor: '#000000'
            }
        ]
    }
});

var chart2 = document.getElementById('duration').getContext('2d');

var styleChart = new Chart(chart2, {
    type: 'bar', // bar, horizontal, pie, line, donut, radar, polar charts supported
    data: {
        labels: ['rock', 'rap', 'opera', 'newage', 'grunge',
            'podcasts', 'alternative', 'ambient', 'emo', 'pop',
            'trance'],
        datasets: [
            {
                data: [1.0, 0.6, 0.8, 0.39, 0.55, 0.54, 0.72, 0.84, 0.67, 0.45, 0.79],
                label: 'Most Listened to Genres',
                backgroundColor: 'rgb(31, 40, 51, 0.25)',
                borderColor: '#1f2833',
                borderWidth: 2,
                fill: true,
                hoverBackgroundColor: '#000000'
            }
        ]
    }
});

var chart3 = document.getElementById('location').getContext('2d');

var locationChart = new Chart(chart3, {
    type: 'pie', // bar, horizontal, pie, line, donut, radar, polar charts supported
    data: {
        labels: ['North America', 'South America', 'Asia', 'Europe', 'Australia'],
        datasets: [
            {
                data: [0.6, 0.1, 0.05, .2, 0.05],
                label: 'Last Listened Track Audio Features',
                backgroundColor: 'rgb(31, 40, 51, 0.25)',
                borderColor: '#1f2833',
                borderWidth: 2,
                fill: true,
                hoverBackgroundColor: '#000000'
            }
        ]
    }
});

var chart4 = document.getElementById('frequency').getContext('2d');

var populationChart = new Chart(chart4, {
    type: 'line', // bar, horizontal, pie, line, donut, radar, polar charts supported
    data: {
        labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
            'Friday', 'Saturday'],
        datasets: [
            {
                data: [1.0, 0.6, 0.8, 0.39, 0.55, 0.54, 0.72],
                label: 'Last Listened Track Audio Features',
                backgroundColor: 'rgb(31, 40, 51, 0.25)',
                borderColor: '#1f2833',
                borderWidth: 2,
                fill: true,
                hoverBackgroundColor: '#000000'
            }
        ]
    }
});

var chart5 = document.getElementById('beat').getContext('2d');

var populationChart = new Chart(chart5, {
    type: 'polarArea', // bar, horizontal, pie, line, donut, radar, polar charts supported
    data: {
        labels: ['120', '60', '78', '82', '40', '90', '130'],
        datasets: [
            {
                data: [1.0, 0.6, 0.8, 0.39, 0.55, 0.54, 0.72],
                label: 'Last Listened Track Audio Features',
                backgroundColor: 'rgb(31, 40, 51, 0.25)',
                borderColor: '#1f2833',
                borderWidth: 2,
                fill: true,
                hoverBackgroundColor: '#000000'
            }
        ]
    }
});
