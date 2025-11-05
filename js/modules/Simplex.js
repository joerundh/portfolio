const Simplex = (() => {
    return function Simplex({
        initial,
        onGet,
        onSet,
        onUnchanged,
        onChanged
    } = {}) {
        let value = initial;

        return new Proxy({}, {
            get(target, prop, receiver) {
                onGet?.();
                if (prop === "value") return value;
            },
            set(target, prop, newValue, receiver) {
                if (prop === "value") {
                    const prevValue = value;
                    value = newValue;
                    if (Object.is(newValue, prevValue)) onUnchanged?.(newValue);
                    else onChanged?.(newValue, prevValue);
                    onSet?.(newValue);
                    return true;
                }

                if (prop === "onGet") {
                    onGet = typeof newValue === "function" ? newValue : undefined;
                    return true;
                }
                if (prop === "onSet") {
                    onSet = typeof newValue === "function" ? newValue : undefined;
                    return true;
                }
                if (prop === "onChanged") {
                    onChanged = typeof newValue === "function" ? newValue : undefined;
                    return true;
                }
                if (prop === "onUnchanged") {
                    onUnchanged = typeof newValue === "function" ? newValue : undefined;
                    return true;
                }

                return true;
            }
        });
    };
})();

export default Object.freeze(Simplex);