// I know not much here, but it makes the code less
var db = (function(window) {

    // Setter
    function _set(key, value) {
        window.localStorage.setItem(key, value);
        return value;
    }

    // Getter
    function _get(key, defaultValue) {
        // console.log(
        //     "DB Checking GET:",
        //     key,
        //     "Value:",
        //     window.localStorage.getItem(key),
        //     "DEFAULT:",
        //     defaultValue
        // );

        if (typeof window.localStorage.getItem(key) !== "undefined" && typeof window.localStorage.getItem(key) !== "null") {
            return window.localStorage.getItem(key);
        }
        if (_.isEmpty(defaultValue)) {
            return false;
        }

        return db.set(defaultValue);
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