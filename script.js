var imageWidth = 730,
    imageHeight = 730,
    imageAspectRatio = imageWidth / imageHeight,
    $window = $(window);

var hotSpots = [{
    'title': 'Intellectual',
    'description': 'Recognizing creative abilities and finding ways to expand knowledge and skills',
    'x': -240,
    'y': -100
    // 'style.transform': 'rotate(90deg)'
}, {
    'title': 'Environmental',
        'description': 'Occupying pleasant, stimulating environments that support well-being',
    'x': -90,
    'y': -240
}, {
    'title': 'Physical',
        'description': 'Recognizing the need for physical activity, healthy foods, and sleep',
    'x': 90,
    'y': -220
},
{
    'title': 'Social',
    'description': 'Developing a sense of connection, belonging, and a well-developed support system',
    'x': 240,
    'y': -100
},
{
    'title': 'Financial',
    'description': 'Satisfaction with current and future financial situations',
    'x': 230,
    'y': 90
},
{
    'title': 'Spiritual',
    'description': 'Expanding a sense of purpose and meaning in life',
    'x': 90,
    'y': 220
}, {
    'title': 'Occupational',
    'description': 'Personal satisfaction and enrichment from one’s work',
    'x': -100,
    'y': 230
}, {
    'title': 'Emotional',
    'description': 'Coping effectively with life and creating satisfying relationships',
    'x': -240,
    'y': 90
}];

function appendHotSpots() {
    for (var i = 0; i < hotSpots.length; i++) {
        var $hotSpot = $('<div>').addClass('hot-spot');
        $('.container').append($hotSpot);
    }
    positionHotSpots();
}

function appendSpeechBubble() {
    var $speechBubble = $('<div>').addClass('speech-bubble');
    $('.container').append($speechBubble);
}

function handleHotSpotMouseover(e) {
    var $currentHotSpot = $(e.currentTarget),
        currentIndex = $currentHotSpot.index(),
        $speechBubble = $('.speech-bubble'),
        title = hotSpots[currentIndex]['title'],
        description = hotSpots[currentIndex]['description'],
        hotSpotTop = $currentHotSpot.offset().top,
        hotSpotLeft = $currentHotSpot.offset().left,
        hotSpotHalfSize = $currentHotSpot.width() / 2,
        speechBubbleHalfSize = $speechBubble.width() / 2,
        topTarget = hotSpotTop - $speechBubble.height(),
        leftTarget = (hotSpotLeft - (speechBubbleHalfSize)) + hotSpotHalfSize;

    $speechBubble.empty();
    $speechBubble.append($('<h1>').text(title));
    $speechBubble.append($('<p>').text(description));

    $speechBubble.css({
        'top': topTarget - (-40),
        'left': leftTarget,
        'display': 'block'
    }).stop().animate({
        opacity: 1
    }, 200);
}

function handleHotSpotMouseout() {
    var $speechBubble = $('.speech-bubble');
    $speechBubble.stop().animate({
        opacity: 0
    }, 200, function () {
        $speechBubble.hide();
    });
}

function positionHotSpots() {
    var windowWidth = $window.width(),
        windowHeight = $window.height(),
        windowAspectRatio = windowWidth / windowHeight,
        $hotSpot = $('.hot-spot');

    $hotSpot.each(function (index) {
        var xPos = hotSpots[index]['x'],
            yPos = hotSpots[index]['y'],
            desiredLeft = 0,
            desiredTop = 0;

        if (windowAspectRatio > imageAspectRatio) {
            yPos = (yPos / imageHeight) * 100;
            xPos = (xPos / imageWidth) * 100;
        } else {
            yPos = ((yPos / (windowAspectRatio / imageAspectRatio)) / imageHeight) * 100;
            xPos = ((xPos / (windowAspectRatio / imageAspectRatio)) / imageWidth) * 100;
        }

        $(this).css({
            'margin-top': yPos + '%',
            'margin-left': xPos + '%'
        });

    });
}

appendHotSpots();
appendSpeechBubble();
$(window).resize(positionHotSpots);
$('.hot-spot').on('mouseover', handleHotSpotMouseover);
$('.hot-spot').on('mouseout', handleHotSpotMouseout);