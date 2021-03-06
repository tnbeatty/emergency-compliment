/**
 * main.js
 *
 * by Nate Beatty | http://natebeatty.com
 * for Megs Senk | http://megssenk.com
 */

/* GLOBAL VARIABLES */

// Load a few standard compliments, just in case the live list reload ceases to work.
var compliments = [
    'You\'re funny. Like, LOL style.',
    'Your voice sounds like a thousand cats purring. Also, I\'m on acid.',
    'You think of the funniest names for wi-fi networks.',
    'People at trivia night are terrified of you.'
];
var links = ['#', '#', '#', '#'];
var clickcounter = 0;
var backgroundColors = [
    '#0080ff',
    '#ffbf00',
    '#01df3a',
    '#ff0080',
    '#9966ff',
    '#ff0033'
];


var refreshCompliments = function() {
    var pubkey = '1eEa2ra2yHBXVZ_ctH4J15tFSGEu-VTSunsrvaCAV598';
    // var cors = (true) ? 'cors.io/' : '';
    var cors = (false) ? 'corsproxy.com/' : '';
    $.getJSON('http://' + cors + 'spreadsheets.google.com/feeds/list/' + pubkey +
        '/od6/public/values?alt=json&callback=?', function(data) {
            console.log(data);
            compliments = [];
            links = [];
            for(var i = 0; i < data.feed.entry.length; i++) {
                compliments.push(data.feed.entry[i]['gsx$compliments']['$t']);
                links.push(data.feed.entry[i]['gsx$links']['$t']);
            }
            console.log('compliments list was refreshed successfully');
        })
        .done(function() {
        })
        .fail(function(jqxhr, textStatus, error) {
            console.log('There was an error fetching new compliments: ' + textStatus);
        })
        .always(function() {
            showNewCompliment();
        });
}

var showNewCompliment = function() {
    setRandomBackground();
    var i = Math.floor(Math.random()*compliments.length);
    var newCompliment = compliments[i];
    $('.compliment').text(newCompliment);
    // Set link path here
    console.log(links[i]);
    $('#thanksbtn a:first-child').attr('href', links[i]);
}

var countClick = function() {
    clickcounter++;
    if (clickcounter == 3) {
        showPurchaseWindow(true);
    }
}

var showPurchaseWindow = function(shouldShow) {
    if (shouldShow) {
        $('.modal#buythebook').addClass('active');
    } else {
        $('.modal#buythebook').removeClass('active');
    }
}

var setRandomBackground = function() {
    var bgcolor = backgroundColors[Math.floor(Math.random()*backgroundColors.length)];
    $('body').css('background-color', bgcolor);
    $('li').css('background-color', bgcolor);
}

$(document).ready(function() {

    var loc = (window.location.pathname.split('/').length > 0) ? window.location.pathname.split('/').reverse()[0] : '/index.html';
    if (loc == '') loc = '/';
    console.log(loc);

    if (['','/', '/index.html', 'index.html'].indexOf(loc) >= 0) {
        console.log('Index page setup');
        refreshCompliments();
    } else if (['/about.html', 'about.html'].indexOf(loc) >= 0) {
        console.log('About page setup');
        $('html').addClass('aboutpage');
    } else if (['/store.html', 'store.html'].indexOf(loc) >= 0) {
        console.log('About page setup');
        $('html').removeClass();
        $('html').addClass('storepage');
    }

    // $('body').css('background-color', bgcolor);
    $('li').css('background-color', $('body').css('background-color'));

    // Assign Listeners (INDEX)

    $('#mehbtn').click(function() {
        showNewCompliment();
        countClick();
    });

    $('.modal#buythebook').click(function() {
        // showPurchaseWindow(false);
    });

    // Assign Listeners (STORE)

    $('.posterlink').hover(
        function() { // show
            $('#togglepviz').css('visibility', 'visible');
        },
        function() { // hide
            $('#togglepviz').css('visibility', 'hidden');
        }
    );

    $('.booklink').hover(
        function() { // show
            $('#togglebviz').css('visibility', 'visible');
        },
        function() { // hide
            $('#togglebviz').css('visibility', 'hidden');
        }
    );

});
