/**
 * @file homeAPI.js
 * The source code of the radar graph that powers the LastListened to track audio features graph.
 *
 * @todo add hover attribute (number corresponding to each attribute.)
 */

/* Spotrify Description of each track feaature. */
var danceabilityDesc = 'Danceability describes how suitable a track is for ' +
'dancing based on a combination of musical\nelements including tempo, rhythm ' +
'stability, beat strength, and overall regularity.\nA value of 0.0 is least ' +
'danceable and 1.0 is most danceable.';
var energyDesc = 'Energy is a measure from 0.0 to 1.0 and represents a ' +
'perceptual measure of intensity and activity.\nTypically, energetic tracks' +
'feel fast, loud, and noisy.';
var speechinessDesc = 'Speechiness detects the presence of spoken words in a ' +
'track. The more exclusively speech-like\nthe recording (e.g. talk show, audio'+
'book, poetry), the closer to 1.0 the attribute value.';
var acousticnessDesc = 'A confidence measure from 0.0 to 1.0 of whether ' +
'the track is acoustic.\n1.0 represents high confidence the track is acoustic.';
var instrumentalnessDesc = 'Predicts whether a track contains no vocals. ' +
'“Ooh” and “aah” sounds are treated as instrumental\nin this context. ' +
'Rap or spoken word tracks are clearly “vocal”. The closer the ' +
'instrumentalness\nvalue is to 1.0, the greater likelihood the track ' +
'contains no vocal content.';
var livenessDesc = 'Detects the presence of an audience in the recording. ' +
'Higher liveness values represent an\nincreased probability that the track ' +
'was performed live.\nA value above 0.8 provides strong likelihood that the ' +
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
                bodyFontSize: 12
            }
        }
    });
}
