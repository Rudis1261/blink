var bth = (function($, window, db, loader) {

    var _devices        = {};
    var _hide           = false;
    var _listDevices    = false;
    var _retry          = 0;
    var _maxRetry       = 20;

    /**
     * ON EVENTS (CALLBACK FUNCTIONS)
     */
    function _hideAll()
    {
        $(".status-on").hide();
        $(".status-off").hide();
        $(".no-devices").hide();
        $(".connected").hide();
        loader.close();

        /*$(".status-on").show();
        $(".status-off").show();
        $(".no-devices").show();
        $(".connected").show();*/
    }


    function _construct()
    {
        $(document).on("deviceready", function(){

            _volumeRocker();
            _goButton();
            _swipeArea();
            _touchArea();
            _checkEnabled();
        });
    }


    function _checkEnabled()
    {
        _hideAll();
        bluetoothSerial.isEnabled(
            _onEnabled,
            function() {
                bluetoothSerial.enable(
                    _onEnabled,
                    _onDisabled
                );
            }
        );
    }


    function _onEnabled()
    {
        console.log("Bluetooth Enabled");
        $(".status-on").show();
        $('body').addClass("on");
        $('body').removeClass("off");
        bluetoothSerial.isConnected(_onConnected, _onNotConnected);
    }


    function _onDisabled()
    {
        console.log("Bluetooth Disabled");
        $(".status-off").show();
        $('body').addClass("off");
        $('body').removeClass("on");
    }


    function _onConnected(device)
    {
        console.log("CONNECTED, send commands");
        _hideAll();

        //_setLastConnected();

        $(".connected").show();
        //_message("Successfully connected");
        //_listDevices    = false;
        _retry = 0;
    }


    function _onNotConnected(device)
    {
        console.log("NOT CONNECTED, listing devices");
        //_hideAll();

        // I swear we were connected, just now!
       /* if (_wasConnected) {
            _checkReconnect("Connection lost, attempting to reconnect");
        }*/

        // Should we list the devices?
        /*if ( ! _listDevices)
        {
            _checkReconnect("Attempting to connect to previous server");
        }*/
        bluetoothSerial.list(_onDeviceList);
    }


    function _onDeviceList(devices)
    {
        // No paired devices
        if (devices.length === 0) {
            _onNoDevices();

        } else {

            $('div.devices').show();
            var deviceList = "";
            devices.forEach(function(device) {
                deviceList += '<li data-id="' + device.id + '" onClick="bth.connect(\'' + device.id + '\');">';
                deviceList += device.name + ' [' + device.id + ']';
                deviceList += '</li>';

                _devices[device.id] = device.name;
            });

            db.set(
                "devices",
                devices
            );

            $('ul.devices').html(deviceList);
        }
    }


    function _onNoDevices()
    {
        _hideAll();
        $(".no-devices").show();
    }


    function _connect(device)
    {
        $('[data-id="' + device + '"]').addClass("active");
        db.set("last_device_attempt", device);
        console.log("Connecting to " + _devices[device] + "....");
        loader.set("Connecting to " + _devices[device] + "....");

        bluetoothSerial.connect(
            device,
            function (message){
                console.log("CONNECTED SUCCESSFULLY");
                loader.close();
                console.log(message);
                _onConnected();
            },
            function(){
                console.log("FAILED TO CONNECT");
                loader.error("Failed to connect to the server. Please ensure that it is running", true, 10000);
            }
        );
    }


    function _setLastConnected() {
        if (db.get("last_device_attempt")) {
            db.set("last_device_success",
                db.get("last_device_attempt")
            );
        }
    }


/*    function _reconnect(device) {
        if (_retry <= _maxRetry) {

            _retry += 1;
            _error("Attempting to reconnect (" + _retry + " of " + _maxRetry + ")");
            //_connect(device);

        }  else {
            _error("Failed to reconnect!");
        }
    }

    // Attempt to reconnect to the last item
    function _checkReconnect(message) {
        //_error(message);
        if (db.get("last_device_success")) {
            _reconnect(db.get("last_device_success"));
        }
    }*/

    /*function _startConnectionSequence() {
        bluetoothSerial.isConnected(
            function(){_onConnected();},
            function(){_onNotConnected();}
        );
    }*/


    /*function _mainLoop(){
        _theLoop = setInterval(function(){_loop();}, _loopInterval);
    }

    function _loop() {
        var getDevices = db.get("devices");
        if (getDevices) {
            _devices = getDevices;
        }

        bluetoothSerial.isEnabled(
            _onEnabled,
            _onDisabled
        );
    }*/

    // Volume Rocker Event Listener
    function _volumeRocker() {
        $(window).on("volumebuttonslistener", function(event){
            if (event.originalEvent.signal){
                if (event.originalEvent.signal == "volume-down"){
                    _action("vol-down");
                }
                if (event.originalEvent.signal == "volume-up"){
                    _action("vol-up");
                }
            }
        });
    }

    // We have a swipe are we need to be able to detect
    function _swipeArea() {
        var actions         = {};
        var actionText      = {};
        actions["right"]    = "prev";
        actions["left"]     = "next";
        actions["up"]       = "play";
        actions["down"]     = "stop";
        actionText["right"] = "Previous";
        actionText["left"]  = "Next";
        actionText["up"]    = "Playing";
        actionText["down"]  = "Stopped";

        $(".swipearea").swipe({
            swipe:function(event, direction, distance, duration, fingerCount){
                if (actions[direction]) {
                    $(this).text(actionText[direction]);
                    bth.action(actions[direction]);
                }
            },
            threshold: $(".swipearea").hasClass('on') ? 80 : 0
        });
    }


    // The skip left and right buttons also need listeners
    function _touchArea() {
        $(".touchable").on("click touchstart", function(){
          console.log("Tap Detected: " + $(this).data("action"));
          bth.action($(this).data("action"));
        });
    }


    // Manage Manual Actions
    function _action(value) {
        bluetoothSerial.write(value, function (data) {
            console.log(data);
        }, function(data){
            console.log(data);
        });
    }

    // Go Button event listener
    function _goButton() {
        $("input[type='text']").on("keydown", function(event){
            if (event.keyCode == 9 || event.keyCode == 13) {
                _action( $(this).val() );
            }
        });
    }


    /**
     * Auto-initilze and construct the module object
     */
    _construct();
    return {
        // Only the connect function is exposed at the moment
        connect: _connect,
        action: _action
    };

})(jQuery, window, db, loader);