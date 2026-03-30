interface DraggableOptions {
    press?: Function;
    drag?: Function;
    release?: Function;
    cancel?: Function;
    mouseOnly?: boolean;
    clickMoveClick?: boolean;
}

export class Draggable {
    constructor(options?: DraggableOptions);
    update(options?: DraggableOptions): void;
    bindTo(element: Element): void;
    destroy(): void;
}

export default Draggable;

