var loader = (function($){

    var _loader  = $('.js-loader');
    var _message = $('.js-loader-message');
    var _image   = $('.js-loader > .loader-image');
    var _types   = ['success', 'error'];
    var _type    = 'success';


    function _set(message, autoclose, time)
    {
        for(type in _types) {
            _loader.find('.' + _types[type]).hide(0);
            if (_type == _types[type]) {
                _loader.find('.' + _types[type]).show(0);
            }
        }

        _close();
        _message.text(message);
        _loader.show(0);
        _type = 'success';

        if (typeof autoclose !== "undefined" && autoclose == true) {
            var time = time || 3000;
            window.setTimeout(_close, time);
        }
    }


    function _error(message, autoclose, time)
    {
        _type = 'error';
        _set(message, autoclose, time);
    }


    function _close()
    {
        _loader.hide(0);
    }


    // Return Nothing
    return {
        set : _set,
        close: _close,
        error: _error
    };

})(jQuery);