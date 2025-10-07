/*
The function takes a maximum value, along with a set of functions to be called 
when such-and-such a thing happens with the scrolling:

    - any: called whenever the position changes, regardless of direction;
    - moveUp: called when scrolling up;
    - moveDown: called when scrolling down;
    - reachTop: called when scrolling to the top;
    - leaveTop: called when scrolling away from the top;
    - reachBottom: called when scrolling to the bottom;
    - leaveBottom: called when scrolling away from the bottom.
*/

const ScrollController = (max, {
    any = () => {},
    moveUp = () => {},
    moveDown = () => {},
    reachTop = () => {},
    leaveTop = () => {},
    reachBottom = () => {},
    leaveBottom = () => {}
}) => {
    let position = 0;

    return e => {
        if (e.deltaY > 0) {
            if (position < max) {
                position++;
                any();
                moveDown();
                if (position === 1) {
                    leaveTop();
                } else if (position === max) {
                    reachBottom();
                }
            }
        } else if (e.deltaY < 0) {
            if (position > 0) {
                position--;
                any();
                moveUp();
                if (position === max - 1) {
                    leaveBottom();
                } else if (position === 0) {
                    reachTop();
                }
            }
        }
    }
};

export { ScrollController };