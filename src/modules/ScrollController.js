import Simplex from "/src/modules/Simplex.js";

const ScrollController = function({
    init = 0,
    max = Infinity,
    onScroll = undefined,
    onMoveUp = undefined,
    onMoveDown = undefined,
    onReachTop = undefined,
    onReachBottom = undefined,
    onLeaveTop = undefined,
    onLeaveBottom = undefined
} = {}) {
    if (typeof init !== "number" || Math.floor(init) !== init || init < 0 || init > max) {
        throw new Error("Initial scroll count must be a non-negative integer.");
    }
    if (typeof max !== "number" || Math.floor(max) !== max || max <= 0) {
        throw new Error("Maximum scroll count must be a positive integer.");
    }

    const current = Simplex({ initial: init });
    const maximum = Simplex({ initial: max });

    const callback = e => {
        if (e.deltaY > 0) {
            if (current.value < maximum.value) {
                current.value++;
                onScroll?.(e);
                onMoveDown?.(e);
                if (current.value === 1) {
                    onLeaveTop?.(e);
                }
                if (current.value === maximum.value) {
                    onReachBottom?.(e);
                }
            }
        } else if (e.deltaY < 0) {
            if (current.value > 0) {
                current.value--;
                onScroll?.(e);
                onMoveUp?.(e);
                if (current.value === maximum.value - 1) {
                    onLeaveBottom?.(e);
                }
                if (current.value === 0) {
                    onReachTop?.(e);
                }
            }
        }
    }

    const proxy = new Proxy({}, {
        get(target, prop, receiver) {
            if (prop === "plex") return { current, max: maximum };
            if (prop === "current") return current.value;
            if (prop === "max") return maximum.value;
            if (prop === "callback") return callback;
            return undefined;
        },
        set(target, prop, value, receiver) {
            if (prop === "current") {
                if (typeof value === "number") {
                    if (value > maximum.value) current.value = maximum.value;
                    else if (value < 0) current.value = 0;
                    else current.value = value;
                }
            };
            if (prop === "max") {
                if (typeof value === "number" && value >= 0) {
                    maximum.value = value;
                    if (current.value > value) current.value = value;
                }
            };
            if (prop === "onScroll") onScroll = typeof value === "function" ? value : undefined;
            if (prop === "onMoveDown") onMoveDown = typeof value === "function" ? value : undefined;
            if (prop === "onMoveUp") onMoveUp = typeof value === "function" ? value : undefined;
            if (prop === "onLeaveTop") onLeaveTop = typeof value === "function" ? value : undefined;
            if (prop === "onLeaveBottom") onLeaveBottom = typeof value === "function" ? value : undefined;
            if (prop === "onReachTop") onReachTop = typeof value === "function" ? value : undefined;
            if (prop === "onReachBottom") onReachBottom = typeof value === "function" ? value : undefined;
            return true;
        }
    });

    return Object.freeze(proxy);
};

export default ScrollController;