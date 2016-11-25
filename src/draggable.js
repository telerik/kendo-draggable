const proxy = (a, b) => (e) => b(a(e));

const bind = (el, event, callback) =>
    el.addEventListener && el.addEventListener(event, callback);

const unbind = (el, event, callback) =>
    el.removeEventListener && el.removeEventListener(event, callback);

const touchRegExp = /touch/;

function normalizeEvent(e) {
    if (e.type.match(touchRegExp)) {
        return {
            pageX: e.changedTouches[0].pageX,
            pageY: e.changedTouches[0].pageY,
            type: e.type,
            originalEvent: e
        };
    }

    return {
        pageX: e.pageX,
        pageY: e.pageY,
        type: e.type,
        ctrlKey: e.ctrlKey,
        shiftKey: e.shiftKey,
        altKey: e.altKey,
        originalEvent: e
    };
}

const noop = function() { };

// 300ms is the usual mouse interval;
// However, an underpowered mobile device under a heavy load may queue mouse events for a longer period.
const IGNORE_MOUSE_TIMEOUT = 2000;

export default class Draggable {
    constructor({ press = noop, drag = noop, release = noop }) {
        this._pressHandler = proxy(normalizeEvent, press);
        this._dragHandler = proxy(normalizeEvent, drag);
        this._releaseHandler = proxy(normalizeEvent, release);

        this._ignoreMouse = false;

        this._touchstart = (e) => {
            if (e.touches.length === 1) {
                this._pressHandler(e);
            }
        };

        this._touchmove = (e) => {
            if (e.touches.length === 1) {
                this._dragHandler(e);
            }
        };

        this._touchend = (e) => {
            // the last finger has been lifted, and the user is not doing gesture.
            // there might be a better way to handle this.
            if (e.touches.length === 0 && e.changedTouches.length === 1) {
                this._releaseHandler(e);
                this._ignoreMouse = true;
                setTimeout(this._restoreMouse, IGNORE_MOUSE_TIMEOUT);
            }
        };

        this._restoreMouse = () => {
            this._ignoreMouse = false;
        };

        this._mousedown = (e) => {
            const { which } = e;

            if ((which && which > 1) || this._ignoreMouse) {
                return;
            }

            bind(document, "mousemove", this._mousemove);
            bind(document, "mouseup", this._mouseup);
            this._pressHandler(e);
        };

        this._mousemove = (e) => {
            this._dragHandler(e);
        };

        this._mouseup = (e) => {
            unbind(document, "mousemove", this._mousemove);
            unbind(document, "mouseup", this._mouseup);
            this._releaseHandler(e);
        };
    }

    bindTo(element) {
        if (element === this._element) {
            return;
        }

        if (this._element) {
            this._unbindFromCurrent();
        }

        this._element = element;

        bind(element, "mousedown", this._mousedown);
        bind(element, "touchstart", this._touchstart);
        bind(element, "touchmove", this._touchmove);
        bind(element, "touchend", this._touchend);
    }

    _unbindFromCurrent() {
        unbind(this._element, "mousedown", this._mousedown);
        unbind(this._element, "touchstart", this._touchstart);
        unbind(this._element, "touchmove", this._touchmove);
        unbind(this._element, "touchend", this._touchend);
    }

    destroy() {
        this._unbindFromCurrent();
        this._element = null;
    }
}
