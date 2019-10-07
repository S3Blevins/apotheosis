/**
 * @file LastListened.js
 * The source code of the radar graph that powers the LastListened to track audio features graph.
 *
 * @todo add hover attribute (number corresponding to each attribute.)
 */


var chart = document.getElementById('LastListened').getContext('2d');

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
                backgroundColor: 'rgb(199, 33, 24, 0.25)',
                borderColor: '#c72118',
                borderWidth: 2,
                fill: true,
                hoverBackgroundColor: '#000000'
            }
        ]
    }
});