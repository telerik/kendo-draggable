[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

A starter repository for Kendo UI platform agnostic components, which provides the basic directory structure and dependencies.

## Structure

- The `src` directory contains the component source code. All files should be have the `.js` extensions so that the build scripts may pick them.
- The `src/bundle.js` file should import and re-export all public components of the package. It is used for the `build-cdn` task.
- The `src/Feature.js` file is the actual sample component implementation. This is also the main entry point for the NPM package (as specified by the `package.json`). The `build-npm-package` transpiles it to `dist/npm/js/Feature.js`;
- The `src/util.js` is an optional example of an additional file - you may remove it if unnecessary.

- The `test` directory contains the component tests. They are transpiled just like the source code itself, and are run with Jasmine in NodeJS.
- The `docs` directory contains markdown files that document the specifics of the component.

## Gulp tasks

- `build-npm-package` - builds the scripts and styles in `dist/npm` in CommonJS format;
- `build-cdn` - builds the scripts and styles in `dist/cdn` in UMD format.
- `test` - runs the tests with Jasmine in NodeJS.
- `watch-test` - runs the tests in watch mode.
- `docs` - launches a preview server for the documentation in the `docs` directory
