// shim for using process in browser
var module = {};
var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            alert('window.postMessage source: ' + ev.source);
            alert('window.postMessage data: ' + ev.data);
            // var passesConditional = ev.source === window && ev.data === 'process-tick';
            var passesConditional = (ev.source === window || ev.source === null) && ev.data === 'process-tick';
            alert('Calling process.nextTicket function: ' + passesConditional);
            // if (ev.source === window && ev.data === 'process-tick') {
            if (passesConditional) {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

alert('You should see a few alerts being generated from a `process.nextTick` call');
process.nextTick(function () {
    alert('process.nextTick called!');
});