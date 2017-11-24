import Draggable from '../src/main';
import { pointerdown, pointermove, pointerup } from './pointer-util';

describe('Draggable with Pointer events', () => {
    let el;
    let draggable;
    let handler;

    if (!window.PointerEvent) {
        return;
    }

    beforeEach(() => {
        el = document.createElement("div");
        document.body.appendChild(el);
    });

    afterEach(() => {
        draggable && draggable.destroy();
        document.body.removeChild(el);
    });

    describe("Press", () => {
        beforeEach(() => {
            handler = jasmine.createSpy("onPress");

            draggable = new Draggable({
                press: handler
            });

            draggable.bindTo(el);
        });

        it("executes press with coordinates on pointerdown", () => {
            pointerdown(el, 100, 200);

            const args = handler.calls.mostRecent().args[0];

            expect(args.pageX).toEqual(100);
            expect(args.pageY).toEqual(200);
        });

        it("executes press with originalEvent on pointerdown", () => {
            pointerdown(el, 100, 200);

            const args = handler.calls.mostRecent().args[0];

            expect(args.originalEvent instanceof PointerEvent).toBeTruthy();
        });

        it("ignores multi touches", () => {
            pointerdown(el, 100, 200);
            pointerdown(el, 100, 200, false);

            expect(handler).toHaveBeenCalledTimes(1);
        });

        it("sets touch-action to none on pointerdown", () => {
            pointerdown(el, 100, 200);
            expect(el.style.touchAction).toEqual('none');
        });
    });

    describe("Drag", () => {
        const drag = () => {
            pointerdown(el, 100, 200);
            pointermove(el, 101, 201);
        };

        beforeEach(() => {
            handler = jasmine.createSpy("onDrag");

            draggable = new Draggable({
                drag: handler
            });

            draggable.bindTo(el);
        });

        it("triggers drag for down + move", () => {
            drag();
            expect(handler).toHaveBeenCalled();
        });

        it("executes drag with offset on pointermove", () => {
            drag();
            const args = handler.calls.mostRecent().args[0];

            expect(100 - Math.abs(args.offsetX)).toBeLessThan(10);
            expect(200 - Math.abs(args.offsetY)).toBeLessThan(10);
        });

        it("disposes drag handlers properly", () => {
            drag();
            draggable.destroy();
            draggable = null;

            pointermove(el, 101, 201);

            expect(handler).toHaveBeenCalledTimes(1);
        });

        it("does not trigger drag before press", () => {
            pointermove(el, 101, 201);
            expect(handler).not.toHaveBeenCalled();
        });
    });

    describe("Release", () => {
        beforeEach(() => {
            handler = jasmine.createSpy("onRelease");

            draggable = new Draggable({
                release: handler
            });

            draggable.bindTo(el);

            pointerdown(el, 100, 200);
            pointermove(el, 101, 201);
            pointerup(el, 101, 201);
        });

        it("triggers release on pointerup", () => {
            expect(handler).toHaveBeenCalled();
        });

        it("disposes drag handlers properly", () => {
            draggable.destroy();
            draggable = null;

            pointerup(el, 101, 201);

            expect(handler).toHaveBeenCalledTimes(1);
        });

        it("restores auto touch-action on pointerup", () => {
            pointerdown(el, 100, 200);
            pointerup(el, 100, 200);
            expect(el.style.touchAction).toEqual('');
        });

        it("restores previous touch-action on pointerup", () => {
            el.style.touchAction = 'pan-y';
            pointerdown(el, 100, 200);
            pointerup(el, 100, 200);
            expect(el.style.touchAction).toEqual('pan-y');
        });
    });
});

