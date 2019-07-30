const stringify = require('remark-stringify')
const parser = require('remark-parse')
const toVfile = require('to-vfile')
const unified = require('unified')

const codeblocks = require('..')

unified()
  .use(parser)
  .use(stringify)
  .use(codeblocks, { lang: 'js' })
  .process(toVfile.readSync('./example.md'))
  .then(file => {
    const code = file.data.codeblocks.join('\n')
    console.log(code)
  })
