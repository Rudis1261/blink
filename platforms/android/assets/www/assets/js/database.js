// I know not much here, but it makes the code less
var db = (function(window) {

    // Setter
    function _set(key, value) {
        return window.localStorage.setItem(key, value);
    }

    // Getter
    function _get(key) {
        return window.localStorage.getItem(key);
    }

    // Trash info
    function _remove(key) {
        window.localStorage.removeItem(key);
        return true;
    }

    // Expose the functions externally
    return {
        set: _set,
        get: _get,
        remove: _remove
    };

})(window);