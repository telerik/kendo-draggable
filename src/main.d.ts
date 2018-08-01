interface DraggableOptions {
    press?: Function,
    drag?: Function,
    release?: Function,
    mouseOnly?: boolean,
    optimizePointerEvents?: boolean,
}

export default class Draggable {
    constructor(options?: DraggableOptions)
    bindTo(element: Element | Document)
    destroy()
}
