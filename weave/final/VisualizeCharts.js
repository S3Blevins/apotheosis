/**
 * @file VisualizeCharts.js
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
                    backgroundColor: 'rgb(149, 94, 189, 0.4)',
                    borderColor: '#bc70ff',
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

var chart2 = document.getElementById('genres').getContext('2d');
function updateGenresChart(genresName, genresCount) {
    var styleChart = new Chart(chart2, {
        type: 'bar', // bar, horizontal, pie, line, donut, radar, polar charts supported
        data: {
            labels: genresName,
            datasets: [
                {
                    label: 'Most Listened to Genres',
                    backgroundColor: [
                        'rgb(41, 126, 255, 0.325)',
                        'rgb(0, 255, 183, 0.325)',
                        'rgb(0, 255, 68, 0.325)',
                        'rgb(18, 22, 255, 0.325)',
                        'rgb(146, 20, 255, 0.325)',
                        'rgb(235, 27, 250, 0.325)',
                        'rgb(233, 247, 25, 0.325)',
                        'rgb(255, 138, 5, 0.325)',
                        'rgb(255, 20, 51, 0.325)',
                        'rgb(0, 255, 47, 0.325)',
                        'rgb(68, 16, 92, 0.325)',
                        'rgb(227, 34, 0, 0.325)'
                    ],
                    borderColor:
                    [
                        '#6ba6ff',
                        '#4affcc',
                        '#00ff44',
                        '#1216ff',
                        '#b259ff',
                        '#eb1bfa',
                        '#f6ff75',
                        '#ffa742',
                        '#ff425b',
                        '#96ffa9',
                        '#553663',
                        '#e32200'
                    ],
                    borderWidth: 2,
                    fill: true,
                    hoverBackgroundColor: '#000000',
                    data: genresCount
                }
            ]
        },
        options: {
             legend: { display: false },
             title: {
                 display: true,
                 text: 'Top Genres from All-Time Favorite Tracks'
            }
        }
    });
}

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
