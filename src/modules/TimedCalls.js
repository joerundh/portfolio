/*
For repeated calls at given interval, make an anonymous function
which does its own repeated setTimeout and register it, maybe with
an initial delay. All up to you.
*/

function TimedCalls() {
    const f = {};
    const calls = [];

    const add = (key, g) => {
        if (f[key]) {
            return;
        }
        f[key] = g;
    }

    const timeCall = function(key, delay) {
        if (!f[key]) {
            return;
        }

        const call = {
            key: key,
            delay: delay
        };
        calls.push(call);
    }

    const callBefore = function(key1, key2, diff) {
        if (!f[key1] || !f[key2]) {
            return;
        }

        const after = calls.find(time => time.key === key2);
        if (!after) {
            return;
        }
        if (after.delay - diff < 0) {
            return;
        }
        
        const call = {
            key: key1,
            delay: after.delay - diff
        }
        calls.push(call);
    }

    const callAfter = function(key1, key2, diff) {
        if (!f[key1] || !f[key2]) {
            return;
        }

        const before = calls.find(time => time.key === key2);
        if (!before) {
            return;
        }

        const call = {
            key: key1,
            delay: before.delay + diff
        };
        calls.push(call);
    }

    const run = function() {
        calls.sort((time1, time2) => time1.timePoint < time2.timePoint);

        calls.forEach(call => setTimeout(
            f[call.key],
            call.delay
        ));
    }

    return {
        add,
        timeCall,
        callBefore,
        callAfter,
        run
    }
}

export default TimedCalls;