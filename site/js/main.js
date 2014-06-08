/* GLOBAL VARIABLES */

// Load a few standard compliments, just in case the live list reload ceases to work.
var compliments = [
    'You\'re funny. Like, LOL style.',
    'Your voice sounds like a thousand cats purring. Also, I\'m on acid.',
    'You think of the funniest names for wi-fi networks.',
    'People at trivia night are terrified of you.'
];
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
    var cors = (true) ? 'cors.io/' : '';
    $.getJSON('http://' + cors + 'spreadsheets.google.com/feeds/list/' + pubkey +
        '/od6/public/values?alt=json', function(data) {
            compliments = [];
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
    setRandomBackground();
    var newCompliment = compliments[Math.floor(Math.random()*compliments.length)];
    $('.compliment').text(newCompliment);
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

var resetCSS = function() {
    // $('body').css();
    // $('li').css();
}

$(document).ready(function() {
    console.log(window.location.pathname);

    if (['/', '/index.html'].indexOf(window.location.pathname) >= 0) {
        console.log('Index page setup');
        refreshCompliments();
    } else if (['/about.html'].indexOf(window.location.pathname) >= 0) {
        console.log('About page setup');
        $('html').addClass('aboutpage');
    } else if (['/store.html'].indexOf(window.location.pathname) >= 0) {
        console.log('About page setup');
        $('html').removeClass();
        $('html').addClass('storepage');
    }

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
        function() {
            $('.posterpgph').show();
        },
        function() {
            $('.posterpgph').hide();
        }
    );

    $('.booklink').hover(
        function() {
            $('.bookpgph').show();
        },
        function() {
            $('.bookpgph').hide();
        }
    );

});
