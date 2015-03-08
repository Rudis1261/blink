var dragon = (function($){

    // Reset the env
    var _startX             = 0;
    var _startY             = 0;
    var _endX               = 0;
    var _endY               = 0;
    var _dragging           = false;
    var _trottleInput       = 20;
    var _pointers           = 0;
    var _startTime          = Date.now();
    var _previousTime       = _startTime;
    var _endTime            = Date.now();
    var _clickTheshold      = 200;
    var _dblClickTheshold   = 400;
    var _rightClickTheshold = 500;
    var _tapEventMax        = 3000;


    // Get the coords regardless whether it's a mouse or touch event
    var pointerPositionXY = function(e){
        var out = {x:0, y:0};
        var touchEvents = ["touchstart", "touchmove", "touchend", "touchcancel"];
        var mouseEvents = ["mousedown", "mouseup", "mousemove", "mouseover", "mouseenter", "mouseleave", "mouseout"];

        if (touchEvents.indexOf(e.type)){

            // Touch Type events
            var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
            _pointers = (e.originalEvent.touches.length || e.originalEvent.changedTouches.length);
            console.log(_pointers);
            out.x = touch.pageX;
            out.y = touch.pageY;

        } else if (mouseEvents.indexOf(e.type)){
            // Mouse Type events
            out.x = e.pageX;
            out.y = e.pageY;
        }
        return out;
    };


    // Create the handlers
    $("[data-type='drag-area']").bind({
        mousedown:      function(event) { _activate(event); },
        touchstart:     function(event) { _activate(event); },
        mouseup:        function(event) { _complete(event); },
        mouseleave:     function(event) { _complete(event); },
        touchend:       function(event) { _complete(event); },
        touchleave:     function(event) { _complete(event); }
    });



/*    $("[data-type='drag-area']").on('tap', function() {
        console.log('TAPPING');
    });


    $("[data-type='drag-area']").on('doubletap', function() {
        console.log('DOUBLE TAPPING');
    });*/


    // Throttle the mouse moves somewhat, to ensure we do not flood the comms
    $("[data-type='drag-area']").on('touchmove mousemove', _.throttle(
        function(event){
            _track(event);
        },_trottleInput)
    );

    // We need to get starting coords, and set the dragging to enabled
    function _activate(event) {
        event.preventDefault();

        _previousTime = _startTime;
        _startTime    = Date.now();

        var getXY   = pointerPositionXY(event);
        console.log(_pointers);
        _startX     = getXY.x;
        _startY     = getXY.y;
    }

    // On mouse move / touch move, this tracks the position and sends the commands
    function _track(event) {
        _dragging   = true;
        event.preventDefault();

        // Get the current position, and the distance we have since dragged
        var getXY       = pointerPositionXY(event);
        _endX           = getXY.x;
        _endY           = getXY.y;
        _getDistance    = _distance();

        // Send the command via the BTH
        bth.action(
            JSON.stringify({
                action: "mouse-move",
                x: (_getDistance.x < 2 || _getDistance.x > -2) ? _getDistance.x : _getDistance.x * 10,
                y: (_getDistance.y < 2 || _getDistance.y > -2) ? _getDistance.y : _getDistance.y * 10
            })
        );

        // Set the start to the current positions. This ensures that movements are relative
        _startX = _endX;
        _startY = _endY;
    }

    // Once complete, just set the dragging to disabled
    function _complete(event){
        event.preventDefault();

        _handleClicks();

        if (_dragging) {
            _dragging = false;
        }
    }


    // As the name indicates this is to check if a click has occurred.
    // Single quick tap for click
    // Longer Single Tap for right click
    // Multiple sequential clicks
    function _handleClicks(){

        _endTime            = Date.now();
        var timeSpent       = (_endTime - _startTime);
        var timeSpentBefore = (_endTime - _previousTime);

        console.log("NOW: " + _endTime);
        console.log("BEFORE: " + _startTime);
        console.log("OFFSET_NOW: " + timeSpent);
        console.log("OFFSET_BEFORE: " + timeSpentBefore);
        console.log("PREVIOUS: " + _previousTime);
        console.log("DRAGGING: " + _dragging);
        console.log("RIGHT CLICK?: " + (timeSpent > _rightClickTheshold));
        console.log("DOUBLE CLICK?: " + (timeSpentBefore > _dblClickTheshold));
        console.log("CLICK?: " + (timeSpent > _clickTheshold));

        if (timeSpent <= _tapEventMax && ! _dragging){

            console.log("DRAGGING TIME (MS)");
            console.log(timeSpent);

            if (timeSpent > _rightClickTheshold){
                bth.action('rclick');
            }

            else if (timeSpentBefore < _dblClickTheshold){
                bth.action('click');
                bth.action('click');
                console.log("DOUBLE CLICK!");
            }

            else if (timeSpent < _clickTheshold){
                bth.action('click');
                console.log("Single Click");
            }
        }
    }

    // We need to be able to determine how far the dragging action was
    function _distance() {
        var out = { x:0, y:0 };
        if (_dragging) {
            out.x = _endX - _startX;
            out.y = _endY - _startY;
        }
        return out;
    }

    // Return Nothing
    return {};

})(jQuery);