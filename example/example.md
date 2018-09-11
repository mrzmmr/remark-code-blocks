# remark-code-blocks

This is a remark plugin to extract out the values from `code` nodes in a markdown input, and save it in VFiles data property.

## options

### options.lang

:default = 'all'

Specify to select only `code` nodes with a type of `lang`. When this option is set, than codeblocks will be an array.

i.e:
`VFile.data.codeblocks = []`

### options.name

:default = 'codeblocks'

Specify what the property in data should be called.

i.e
`VFile.data[ options.name ] = []`

### options.formatter

:default = (r => r)

Optionally pass a formatter function to run on the code stored.

```js
module.exports = options => (tree, file) => {
    const settings = options || {}
    const lang = settings.lang || 'all'
    const name = settings.name || 'codeblocks'
    const formatter = settings.formatter || (r => r)

```

If codeblocks is not defined already in data, then it is created. If lang is specified than codeblocks will be an array, otherwise it will be an object where the key is the lang of the found code block and the value is an array of values.

```js
    if (!file.data[name]) {
        if (lang === 'all') {
            file.data[name] = {}
        } else {
            file.data[name] = []
        }
    }

```

For each code node found, if lang is specified, then a new prop in codeblocks is set to the lang type. Then the value is run through the formatter function provided and pushed into properties array. Otherwise, codeblocks is set to an array, and the `code` node's value is run through the formatter function provided and pushed onto the array.

```js
    const { children } = tree
    let i = -1
    let child

    while (++i < children.length) {
        child = children[i]

        if (child.type === 'code' && child.value) {
            if (lang === 'all') {
                child.lang = child.lang || '_'
                if (!file.data[name][child.lang]) {
                    file.data[name][child.lang] = []
                }
                file.data[name][child.lang].push(formatter(child.value))
            } else {
                if (child.lang === lang) {
                    file.data[name].push(formatter(child.value))
                }
            }
        }
    }
}
```
