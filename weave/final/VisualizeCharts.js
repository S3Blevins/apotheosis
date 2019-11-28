/**
 * @file VisualizeCharts.js
 * The source code of the radar graph that powers the LastListened to track audio features graph.
 *
 */


/* Global options here */
/* Spotrify Description of each track feaature. */
var danceabilityDesc = 'Danceability describes how suitable a track is for ' +
'dancing based on a combination of musical elements including\ntempo, rhythm ' +
'stability, beat strength, and overall regularity.\nA value of 0.0 is least ' +
'danceable and 1.0 is most danceable.';
var energyDesc = 'Energy is a measure from 0.0 to 1.0 and represents a ' +
'perceptual measure of intensity and activity.\nTypically, energetic tracks' +
'feel fast, loud, and noisy.';
var speechinessDesc = 'Speechiness detects the presence of spoken words in a ' +
'track. The more exclusively speech-like the recording\n(e.g. talk show, audio'+
'book, poetry), the closer to 1.0 the attribute value.';
var acousticnessDesc = 'A confidence measure from 0.0 to 1.0 of whether ' +
'the track is acoustic.\n1.0 represents high confidence the track is acoustic.';
var instrumentalnessDesc = 'Predicts whether a track contains no vocals. ' +
'“Ooh” and “aah” sounds are treated as instrumental in this context.\n' +
'Rap or spoken word tracks are clearly “vocal”. The closer the ' +
'instrumentalness value is to 1.0, the greater\nlikelihood the track ' +
'contains no vocal content.';
var livenessDesc = 'Detects the presence of an audience in the recording. ' +
'Higher liveness values represent an increased probability that the track\n' +
'was performed live. A value above 0.8 provides strong likelihood that the ' +
'track is live.';
var valenceDesc = 'A measure from 0.0 to 1.0 describing the musical ' +
'positiveness conveyed by a track.\nTracks with high valence sound more' +
'positive (e.g. happy, cheerful, euphoric),\nwhile tracks with low valence ' +
'sound more negative (e.g. sad, depressed, angry).';

var desc = [danceabilityDesc, energyDesc, speechinessDesc, acousticnessDesc,
instrumentalnessDesc, livenessDesc, valenceDesc];

var chart = document.getElementById('LastListened').getContext('2d');

/**
 * The Very first chart the user is prompted to showing the last track
 * they listened to audio analysis.ac
 */

function updateRadarChart(dataArray) {

    var massPopChart = new Chart(chart, {
        type: 'radar', // bar, horizontal, pie, line, donut, radar, polar charts supported
        data: {
            labels: ['Danceability', 'Energy', 'Speechiness', 'Acousticness',
                'Instrumentalness', 'Liveness', 'Valence'],
            datasets: [
                {
                    data: dataArray,
                    label: 'Last Listened Track Audio Features',
                    backgroundColor: 'rgb(255, 18, 227, 0.4)',
                    borderColor: '#ff4dea',
                    borderWidth: 2,
                    fill: true,
                    pointHoverBackgroundColor: '#ff78ef'
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
            },
            tooltips: {
                enabled: true,
                callbacks: {
                    title: function(tooltipItem, data) {
                        /* Return the title of each label */
                        return data['labels'][tooltipItem[0]['index']];
                     },
                     label: function(tooltipItem, data) {
                         /* Return the value audio feature of the track */
                        return data['datasets'][0]['data'][tooltipItem['index']];
                     },
                     afterLabel: function(tooltipItem, data) {
                         /* Return the description of the audio feature. */
                        return desc[[tooltipItem['index']]];
                    }
                },
                titleFontSize: 24,
                titleFontColor: '#ffffff',
                titleMarginBottom: 6,
                bodyFontSize: 10
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
                    data: genresCount
                }
            ]
        },
        options: {
             responsive: true,
             legend: { display: false },
             title: {
                 display: true,
                 text: 'Top Genres from All-Time Favorite Tracks'
            },
            tooltips: {
                enabled: true,
                callbacks: {
                    title: function(tooltipItem, data) {
                        /* Return the title of each label */
                        return data['labels'][tooltipItem[0]['index']];
                     },
                     label: function(tooltipItem, data) {
                         /* Return the value audio feature of the track */
                        return data['datasets'][0]['data'][tooltipItem['index']] +
                        " Instances";
                     },
                     afterLabel: function(tooltipItem, data) {
                        var postfix = '';
                        var explain = 'The number represents how many times the ' +
                        'genre is present in your top favorite tracks.';
                        /* Return the description of the audio feature. */
                        if (tooltipItem['index'] == 0) {postfix = 'st';}
                        else if (tooltipItem['index'] == 1) {postfix = 'nd';}
                        else if (tooltipItem['index'] == 2) {postfix = 'rd';}
                        else {postfix = 'th';}
                        return "Your " + (tooltipItem['index'] + 1) + postfix +
                                        " most listened to genre.\n" + explain;
                    }
                },
                titleFontSize: 24,
                titleFontColor: '#ffffff',
                titleMarginBottom: 6,
                bodyFontSize: 10
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

var chart3 = document.getElementById('moods').getContext('2d');
function updateMoodsChart(trackValence) {
    var data = {
        //         100-90    89 - 70   69 - 50      49-30           29 - 11       10-0
        labels: ['Euphoric', 'Happy', 'Neutral', 'Discouraging', 'Depressing', 'You okay?'],
        datasets: [{
            backgroundColor: [
                'rgb(255, 244, 28, 0.8)',
                'rgb(15, 223, 255, 0.8)',
                'rgb(127, 57, 247, 0.8)',
                'rgb(247, 15, 69, 0.8)',
                'rgb(117, 0, 2, 0.8)',
                'rgb(0, 0, 0, 0.85)'
            ],
            data: trackValence,
            borderColor: 'rgb(0, 0, 0, 0.525)',
            borderWidth: 1.5,
            fill: true
        }]
    };

    var moodsChart = new Chart(chart3, {
        type: 'pie', // bar, horizontal, pie, line, donut, radar, polar charts supported
        data: data,
        options: {
            responsive: true,
            //rotation: 0.8 * Math.PI, // Roatates the graph
            tooltips: {
                enabled: true,
                callbacks: {
                    title: function(tooltipItem, data) {
                        /* Return the title of each label */
                        return data['labels'][tooltipItem[0]['index']];
                     },
                     label: function(tooltipItem, data) {
                         /* Return the value audio feature of the track */
                        return data['datasets'][0]['data'][tooltipItem['index']]
                        + "/50 Tracks";
                     },
                     afterLabel: function(tooltipItem, data) {

                        /* Return the description of the audio feature. */
                        if (tooltipItem['index'] == 0) {
                            return "These songs are extremely uplifting and " +
                            "joyous!";
                        } else if (tooltipItem['index'] == 1) {
                            return "These songs represent a lot of happiness " +
                            "and demonstrate positive vibes.";
                        } else if (tooltipItem['index'] == 2) {
                            return "These songs are neither too happy or " +
                            "too sad.";
                        } else if (tooltipItem['index'] == 3) {
                            return "These songs demonstrate the start of " +
                            "angier or unhappy songs but are not fully made" +
                            " up of these traits.";
                        } else if (tooltipItem['index'] == 4) {
                            return "These songs demonstrate hints of sadness," +
                            " anger and other traits that make up unhappiness";
                        } else {
                            return "These songs are angy, sad, and/or " +
                            "consist of sorrow and pain in the lyrics or " +
                            "the atmosphere of the song.\nNote: If this " +
                            "section makes up >45 songs, seek your favorite " +
                            "guilty pleassure immediately.";
                        }
                    }
                },
                titleFontSize: 24,
                titleFontColor: '#ffffff',
                titleMarginBottom: 6,
                bodyFontSize: 10
            },
        }
    });
}

var chart4 = document.getElementById('frequency').getContext('2d');

var populationChart = new Chart(chart4, {
    type: 'line', // bar, horizontal, pie, line, donut, radar, polar charts supported
    data: {
        labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
            'Friday', 'Saturday'],
        datasets: [{
            data: [1.0, 0.6, 0.8, 0.39, 0.55, 0.54, 0.72],
            label: 'Last Listened Track Audio Features',
            backgroundColor: 'rgb(31, 40, 51, 0.25)',
            borderColor: '#1f2833',
            borderWidth: 2,
            fill: true,
            hoverBackgroundColor: '#000000'
        }]
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
