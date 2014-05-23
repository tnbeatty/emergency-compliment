/**
 * main.js
 *
 * by Nate Beatty | http://natebeatty.com
 * for Megs Senk | http://megssenk.com
 */

// Load a few standard compliments, just in case the live list reload ceases to work.
var compliments = [
    'You\'re funny. Like, LOL style.',
    'Your voice sounds like a thousand cats purring. Also, I\'m on acid.',
    'You think of the funniest names for wi-fi networks.',
    'People at trivia night are terrified of you.'
];

var refreshCompliments = function() {
    var pubkey = '1eEa2ra2yHBXVZ_ctH4J15tFSGEu-VTSunsrvaCAV598';
    var cors = (true) ? 'cors.io/' : '';
    $.getJSON('http://' + cors + 'spreadsheets.google.com/feeds/list/' + pubkey +
        '/od6/public/values?alt=json', function(data) {

            for(var i = 0; i < data.feed.entry.length; i++) {
                compliments.push(data.feed.entry[i]['gsx$compliments']['$t']);
            }
            console.log('compliments list was refreshed successfully');
        })
        .done(function() {

        })
        .fail(function() {
            console.log('There was an error fetching new compliments.');
        })
        .always(function() {
            showNewCompliment();
        });
}

var showNewCompliment = function() {
    var newCompliment = compliments[Math.floor(Math.random()*compliments.length)];
    $('.compliment').text(newCompliment);
}

$(document).ready(function() {
    $('#mehbtn').click(showNewCompliment);
    refreshCompliments();
});
