[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# Kendo UI Draggable

A cross-platform abstraction for drag sequences. Handles mouse drags and touch sequences on mobile devices.

Drag sequence means:

- mouse press, drag, release for desktop devices
- touch press, drag, release for mobile devices

## Installation

The library is published as [scoped NPM package](https://docs.npmjs.com/misc/scope) in the [NPMJS Telerik account](https://www.npmjs.com/~telerik).

```bash
npm install --save '@telerik/kendo-draggable';
```

## Basic usage

The draggable class constructor accepts an object with three optional event handler callbacks - `press`, `drag`, and `release`.

```javascript
import Draggable from '@telerik/kendo-draggable';

const draggable = new Draggable({
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

draggable.bindTo(document.getElementById("my-element"));
```

The draggable may be re-bound to another element - the event handlers will be automatically unbound from the previous one.

```javascript
draggable.bindTo(document.getElementById("another-element"));
```

Since the draggable object persists a reference to the currently bound element, it should be destroyed when/if the corresponding element is removed from the document.

```javascript
draggable.destroy();
```

## Features

- mouse events support
- touch events support
- Handle multiple touches. Rather, don't get confused by them.

## What's next
- Pointer events support, necessary for the Windows Phone platform.

### Dragging on iOS/Android

Handling the drag sequence on mobile devices may require disabling of the touch based scrolling.
The draggable will not do that out of the box. The recommended way to handle this is by setting a [`touch-action`](https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action) CSS property.
Depending on the type of drags handled, you may need `touch-action: none`, `touch-action: pan-y` or `touch-action: pan-x`.

**Notice**: `touch-action` does not work for iOS (yet). Limited support should be available in iOS 9.3, which just got released. However, `pan-x` and `pan-y` don't work.
The simplest means to disable the scrolling in iOS is by preventing the `touchstart` event:

```html
    <div ontouchstart="return false">
        <div id="my-draggable-element"></div>
    </div>
```

### Preventing Selection

Dragging elements with text in them will activate the browser text selection, which, in most cases, is not desirable.

To avoid this, use [`user-select: none`](https://developer.mozilla.org/en-US/docs/Web/CSS/user-select) CSS property with its respective browser prefixes.

### Browser Support

- Google Chrome
- Firefox
- Safari (OS X)
- Safari (iOS)
- Chrome (Android)
- IE/Edge
