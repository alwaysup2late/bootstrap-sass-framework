bootstrap-sass-framework
========================

##Setup
1. cd src/
2. npm install

##Tasks
* grunt watch
  * Watches for changes in scss and script directories and compiles on change
* grunt build:styles:dev
  * Builds from scss to css directory
* grunt build:js:dev
  * Builds from script to js directory
* grunt build:dev
  * Builds out both scss and JS
* grunt build:prod
  * Creates a dist directory in the project root, minifies html, css & js
* grunt build
  * Runs all build processes