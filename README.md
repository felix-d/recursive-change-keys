# recursive-change-keys
A small npm module that let the user change keys of an object recursively.

## Installation

    npm install recursive-change-keys

## Usage

    var recursiveChangeKeys = require("recursive-change-keys");
    recursiveChangeKeys(obj, {oldkey1: "newkey1", oldkey2: "newkey2"});
    console.log(obj);

## Tests

    npm test

## Release History

* 0.1.0 Initial Release


