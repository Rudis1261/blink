$(function(){

    // SLIDERS
    // MOUSE SPEED
    if (!db.get('mouseSensitivity')) {
        db.set('mouseSensitivity', 3)
    }
    var mouseSensitivity = document.getElementById('mouse-sensitivity');
    noUiSlider.create(mouseSensitivity, {
        start: [ db.get('mouseSensitivity') ],
        step: 0.5,
        range: {
            'min': [  1 ],
            'max': [ 8 ]
        }
    });
    mouseSensitivity.noUiSlider.on('change', function(){
        db.set('mouseSensitivity', mouseSensitivity.noUiSlider.get());
    });

    // CLICK SPEED
    if (!db.get('clickSensitivity')) {
        db.set('clickSensitivity', 200)
    }
    var clickSensitivity = document.getElementById('click-sensitivity');
    noUiSlider.create(clickSensitivity, {
        start: [ db.get('clickSensitivity') ],
        step: 100,
        range: {
            'min': [  100 ],
            'max': [ 400 ]
        }
    });
    clickSensitivity.noUiSlider.on('change', function(value){
        db.set('clickSensitivity', clickSensitivity.noUiSlider.get());
    });

    // RIGHT-CLICK SPEED
    if (!db.get('rightClickSensitivity')) {
        db.set('rightClickSensitivity', 500)
    }
    var rightClickSensitivity = document.getElementById('right-click-sensitivity');
    noUiSlider.create(rightClickSensitivity, {
        start: [ db.get('rightClickSensitivity') ],
        step: 100,
        range: {
            'min': [  400 ],
            'max': [ 2000 ]
        }
    });
    rightClickSensitivity.noUiSlider.on('change', function(value){
        db.set('rightClickSensitivity', rightClickSensitivity.noUiSlider.get());
    });
    // SLIDERS

    var menuOpen = false;

    $('.js-open-menu').on('touchstart',function(){

        // Closed menu, open it
        if (!menuOpen) {

            $('.menu-side').addClass("open").velocity(
                {'width': '300px'},
                {
                    queue: false,
                    duration: 200,
                    easing: "easeOutExpo"
                }
            );

            $('.menu-side-background').velocity(
                { opacity: 0.6, 'display': 'block' },
                {
                    queue: false,
                    duration: 100
                }
            ).addClass('open');

            menuOpen = true;
            return true;
        }

        // Open menu, close it
        $('.menu-side').velocity(
            {'width': '0px'},
            {
                queue: false,
                duration: 200,
                easing: "easeOutExpo"
            }
        ).removeClass('open');

        $('.menu-side-background').velocity(
            {opacity : 0},
            {
                queue: false,
                duration: 100
            }
        ).removeClass('open');

        menuOpen = false;
    });
});