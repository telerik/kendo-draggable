const pointerEvent = (type, x, y, isPrimary) =>
    new PointerEvent(type, {
        bubbles: true,
        cancellable: true,

        pointerId: 1,
        isPrimary: isPrimary,
        clientX: x,
        clientY: y,
        view: window
    });

export function pointerdown(element, x, y, primary = true) {
    element.dispatchEvent(pointerEvent("pointerdown", x, y, primary));
}

export function pointermove(element, x, y, primary = true) {
    element.dispatchEvent(pointerEvent("pointermove", x, y, primary));
}

export function pointerup(element, x, y, primary = true) {
    element.dispatchEvent(pointerEvent("pointerup", x, y, primary));
}

