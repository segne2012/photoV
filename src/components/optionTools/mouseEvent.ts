let isMouseDown = false;

let position = { x: 0, y: 0 };

const mouseDown = (event: MouseEvent) => {
    console.log(event);
    event.preventDefault();
    isMouseDown = true;
}

const mouseMove = (event: MouseEvent) => {
    console.log(event);
    event.preventDefault();

}

const mouseUp = (event: MouseEvent) => {
    console.log(event);
    event.preventDefault();
    isMouseDown = false;
}

const mouseLeave = (event: MouseEvent) => {
    console.log(event);
    event.preventDefault();
    isMouseDown = false;
}