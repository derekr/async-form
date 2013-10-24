## async-form
#### XHR forms w/ iFrame fallback.

[![NPM](https://nodei.co/npm/async-form.png?compact=true)](https://nodei.co/npm/transformit/)
![david-dm.png](https://david-dm.org/derekr/async-form.png)
[![browser support](https://ci.testling.com/derekr/async-form.png)](https://ci.testling.com/derekr/async-form)

## Usage

```js
var aform = require('async-form');

document.getElementById('my-file').addEventListener('change', function (e) {
    aform(e.target);
});
```

## Installation

```
npm install async-form --save-dev
```

`require` in your clientside scripts and browserify on medium heat.

## Goals

Provide an easy interface for sending form data asynchronously.
