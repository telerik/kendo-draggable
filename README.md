[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# Kendo UI Draggable

A cross-platform abstraction for drag sequences. Handles mouse drags and touch sequences on mobile devices.

Drag sequence means:

- mouse press, drag, release for desktop devices
- touch press, drag, release for mobile devices

## Installation

The library published as [scoped NPM package](https://docs.npmjs.com/misc/scope) in the [NPMJS Telerik account](https://www.npmjs.com/~telerik).

```bash
npm install --save '@telerik/kendo-draggable';
```

## Basic usage

The draggable class constructor accepts an element and an object with three optional event handler callbacks - `press`, `drag`, and `release`.

```javascript
import Draggable from '@telerik/kendo-draggable';

const element = document.getElementById("my-element");

const draggable = new Draggable(element, {
    press: function(e) {
        console.log("pressed", e.pageX, e.pageY);
    },
    drag: function(e) {
        console.log("drag", e.pageX, e.pageY);
    },
    release: function(e) {
        console.log("release", e.pageX, e.pageY);
    }
});
```

Since the draggable object persists a reference to the element, it should be destroyed if the element is removed.

```javascript
draggable.destroy();
```

Features:

- Support mouse events
- Support touch events
- Handle multiple touches. Rather, don't get confused by them.
- Pointer events support (or, no, not yet?)

### Dragging on iOS/Android

Handling the drag sequence on a mobile devices may require disabling of the touch based scrolling.
The draggable will not do that - the recommended means to handle it is via [`touch-action`](https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action). Most likely, you will need `touch-action:pan-y` or `touch-action:pan-x`.
However, the above won't work for iOS, as limited support for the touch action is available in iOS 9.3, which just got released.

The simplest means to disable the scrolling is by preventing the `touchstart` event:

```html
    <div ontouchstart="return false">
        <div id="my-draggable-element"></div>
    </div>
```

### Preventing Selection

Dragging elements with text in them will activate the browser text selection, which, in most cases, is not desirable.

To avoid this, use [`user-select: none`](https://developer.mozilla.org/en-US/docs/Web/CSS/user-select).

### Browser Support

- Google Chrome
- Firefox
- Safari (OS X)
- Safari (iOS)
- Chrome (Android)
- IE/Edge
