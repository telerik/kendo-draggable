const pointerEvent = (type, x, y, isPrimary = true, button = 0) =>
    new PointerEvent(type, {
        bubbles: true,
        cancellable: true,
        button: button,

        pointerId: 1,
        isPrimary: isPrimary,
        clientX: x,
        clientY: y,
        view: window
    });

export function pointerdown(element, x, y, primary, button) {
    element.dispatchEvent(pointerEvent("pointerdown", x, y, primary, button));
}

export function pointermove(element, x, y, primary, button) {
    element.dispatchEvent(pointerEvent("pointermove", x, y, primary));
}

export function pointerup(element, x, y, primary, button) {
    element.dispatchEvent(pointerEvent("pointerup", x, y, primary));
}

export function pointercancel(element, x, y, primary) {
    element.dispatchEvent(pointerEvent("pointercancel", x, y, primary));
}

