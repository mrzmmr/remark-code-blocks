# remark-code-blocks

> [Remark](https://github.com/syntax-tree/remark) plugin to extract `code` nodes from markdown.

[![Travis](https://img.shields.io/travis/mrzmmr/remark-code-blocks.svg)](https://travis-ci.org/mrzmmr/remark-code-blocks)
[![Coverage
Status](https://coveralls.io/repos/github/mrzmmr/remark-code-blocks/badge.svg?branch=master)](https://coveralls.io/github/mrzmmr/remark-code-blocks?branch=master)

## Install

```
npm i -S remark-code-blocks
```

## Usage

```js
const toVfile = require('to-vfile')
const unified = require('unified')
const parser = require('remark-parser')
const stringify = require('remark-stringify')
const codeblocks = require('remark-code-blocks')

unified()
    .use(parser)
    .use(stringify)
    .use(codeblocks, { /* options */ })
    .process(toVfile('./example.md'))
    .then(file => {
        /* file.data.codeblocks = [ ... ] */
    })
```

or use the standalone function which takes a tree as its first argument.

```js
const toVfile = require('to-vfile')
const unified = require('unified')
const parser = require('remark-parser')
const { codeblocks } = require('remark-code-blocks')

const tree = unified().use(parser).parse(toVfile('./example.md'))
const code = codeblocks(tree, { /* options */ })
```

## API

### .use(codeblocks[, options])
Use as a plugin to extract code nodes.

The results are stored in `file.data` in a `codeblocks` property by default. You can override the name of the property using `options.name`.

### .codeblocks(tree[, options])

Also exports a standalone function.

### Options

#### lang

Type: `string`
Default: `all`

Specify a language and only extract code nodes with that language. Otherwise `all` code nodes are extracted.

#### name

Type: `string`
Default: `codeblocks`

Specify the name of the property in `file.data`

#### formatter

Type: `function`
Default: none

Add a function to run over the nodes values before storing them in `file.data`

## License

MIT &copy; Paul Zimmer

