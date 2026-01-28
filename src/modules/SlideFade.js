const SlideFade = function({
    element,
    opacity1 = 0,
    opacity2 = 1,
    displacement = 0,           // [px]
    direction = "from right",
    duration = 500              // [ms]
}) {
    if (!element) {
        throw new Error("Element not found.");
    }
    if (typeof opacity1 !== "number" || opacity1 < 0 || opacity1 > 1 ) {
        throw new Error("Initial opacity must be a number between 0 and 1.");
    }
    if (typeof opacity2 !== "number" || opacity2 < 0 || opacity2 > 1 ) {
        throw new Error("Initial opacity must be a number between 0 and 1.");
    }
    if (typeof displacement !== "number" || displacement < 0) {
        throw new Error("Displacement must be a positive integer.");
    }
    if (typeof duration !== "number" || duration < 0) {
        throw new Error("Duration must be a positive integer.");
    }
    if (![ "from top", "from bottom", "from left", "from right"] .includes(direction)) {
        throw new Error("Direction must be either \"from above\", \"from below\", \"from left\" or \"from right\".");
    }

    const initialTransform = element.style.transform;
    const initialTransition = element.style.transition;

    element.style.transform = `
        ${initialTransform ? initialTransform + ", " : ""}
        ${
            direction === "from top" ? "translateY(-" + displacement + "px)"
            : direction === "from bottom" ? "translateY(" + displacement + "px)"
            : direction === "from left" ? "translateX(-" + displacement + "px)"
            : "translateX(" + displacement + "px)"
        }
    `;
    element.style.opacity = opacity1;

    return () => {
        element.style.transition = `
            ${initialTransition ? `${initialTransition},` : ""}
            transform ${duration}ms ease-out,
            opacity ${duration}ms ease-out
        `;

        element.style.transform = initialTransform;
        element.style.opacity = opacity2;

        setTimeout(() => {
            element.style.transition = initialTransition;
        }, duration);
    };
}

export default SlideFade;