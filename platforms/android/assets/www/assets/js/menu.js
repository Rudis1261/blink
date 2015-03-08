$(function(){

    var menuOpen = false;

    $('.js-open-menu').on('touchstart',function(){

        if (! menuOpen) {

            $('.menu-side').addClass("open").velocity(
                {'width': '300px'},
                {
                    queue: false,
                    duration: 500,
                    easing: "easeOutExpo"
                }
            );

            $('.menu-side-background').velocity(
                { opacity: 0.6, 'display': 'block' },
                {
                    queue: false,
                    duration: 250
                }
            ).addClass('open');

            menuOpen = true;

        } else {

            $('.menu-side').velocity(
                {'width': '0px'},
                {
                    queue: false,
                    duration: 500,
                    easing: "easeOutExpo"
                }
            ).removeClass('open');

            $('.menu-side-background').velocity(
                {opacity : 0},
                {
                    queue: false,
                    duration: 250
                }
            ).removeClass('open');

            menuOpen = false;
        }

    });
});