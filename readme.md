# Remark Code Blocks

> [Remark](https://github.com/syntax-tree/remark) plugin for selecting and storing code blocks from markdown.

[![Travis](https://img.shields.io/travis/mrzmmr/remark-code-blocks.svg)](https://travis-ci.org/mrzmmr/remark-code-blocks)
[![Codecov](https://img.shields.io/codecov/c/github/mrzmmr/remark-code-blocks.svg)](https://codecov.io/gh/mrzmmr/remark-code-blocks)
[![dependencies Status](https://david-dm.org/mrzmmr/remark-code-blocks/status.svg)](https://david-dm.org/mrzmmr/remark-code-blocks)

## Install

```
npm i -S remark-code-blocks
```

## Usage

```js
const remark = require('remark')
const codeblocks = require('remark-code-blocks')
// markdown = some markdown with `code`

remark()
  .use(codeblocks)
  .process(markdown)
  .then(file => {
    // file.data.codeblocks = [ ...codeblocks ]
  })
  .catch(err => {
    // handle any error
  })
```

## Options

### `codeblocks.lang`
*`string`* - Filters out nodes based on their lang value. Default `null`

### `codeblocks.values`
*`bool`* - Stores a nodes values instead. Default `false`

## Example

Select all the javascript code blocks in a markdown document, join them, prettify, and log the result to the console.

```
# dependencies

npm i remark remark-code-blocks prettier
```

````md
# example.md

## Evens

This code block won’t be selected
```
'use strict'
```

*function expression*
```js
const evens = (array) => {
```

*return filtered array*
```js 
  return array.filter(value => {
```

*filter test*
```js
    return value % 2 == 0
  })
}
```
````

```js
/* example.js */

const codeblocks = require('remark-code-blocks')
const prettier = require('prettier')
const remark = require('remark')
const fs = require('fs')

const markdown = fs.readFileSync('./example.md', 'utf-8')

remark()
  .use(codeblocks, {
    values: true,
    lang: 'js',
  })
  .process(markdown)
  .then(vfile => {
    let code = vfile.data.codeblocks.join('\n')
    let formatted = prettier.format(code)
    console.log(formatted)
  })
```

```js
/* output */

const evens = array => {
  return array.filter(value => {
    return value % 2 == 0;
  });
};
```

## License

MIT &copy; Paul Zimmer

