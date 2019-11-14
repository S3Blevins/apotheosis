/**
 * @file homeAPI.js
 * The source code of the radar graph that powers the LastListened to track audio features graph.
 *
 * @todo add hover attribute (number corresponding to each attribute.)
 */

var chart = document.getElementById('LastListened').getContext('2d');

/**
 * The Very first chart the user is prompted to showing the last track
 * they listened to audio analysis.ac
 */

function updateRadarChart(dataArray) {

    var massPopChart = new Chart(chart, {
        type: 'radar', // bar, horizontal, pie, line, donut, radar, polar charts supported
        data: {
            labels: ['danceability', 'energy', 'speechiness', 'acousticness',
                'instrumentalness', 'liveness', 'valence'],
            datasets: [
                {
                    data: dataArray,
                    label: 'Last Listened Track Audio Features',
                    backgroundColor: 'rgb(31, 40, 51, 0.25)',
                    borderColor: '#1f2833',
                    borderWidth: 2,
                    fill: true,
                    pointHoverBackgroundColor: '#e62412'
                }
            ]
        },
        options: {
            scale: {
                ticks: {
                    min: 0.0,
                    max: 1.0,
                    stepSize: 0.1
                }
            }
        }
    });
}
