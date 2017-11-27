'use strict'

const is = require('unist-util-is')
const remark = require('remark')
const test = require('tap').test
const codeblocks = require('./')

const markdown = `
# Foo

\`\`\`js
const inc = n => n++;
\`\`\`

\`\`\`
inc(42);
\`\`\`
`

const code = markdown.split('\n').filter((n, i) => i === 4 || i === 8)

test('remark-code-blocks', t => {
  let result
  let file

  t.test('should find all `code` nodes including parent.children[0]', it => {
    it.doesNotThrow(() => {
      file = remark()
        .use(codeblocks)
        .processSync(
          markdown
            .split('\n')
            .splice(2)
            .join('\n')
        )
      result = file.data.codeblocks

      it.ok(is(`code`, result[0]), '`code` as first child is included')
      it.ok(result[0].value === code[0], '`code` as first child is included')
    })
    it.end()
  })

  t.test('with no options passed', it => {
    it.doesNotThrow(() => {
      file = remark()
        .use(codeblocks)
        .processSync(markdown)
      result = file.data.codeblocks

      it.ok(file, 'should process')
      it.ok(Array.isArray(result), 'result should be an array')
      it.ok(is('code', result[0]), 'result[i] should be type `code`')
      it.ok(is('code', result[1]), 'results[i] should be type `code`')
    }, 'should not throw')
    it.end()
  })

  t.test('with lang option', it => {
    it.doesNotThrow(() => {
      file = remark()
        .use(codeblocks, { lang: 'js' })
        .processSync(markdown)
      result = file.data.codeblocks

      it.ok(result.length === 1, 'result should have length of 1')
      it.ok(result[0].value === code[0], 'result should be first value code[0]')
    }, 'should not throw')
    it.end()
  })

  t.test('with values option', it => {
    it.doesNotThrow(() => {
      file = remark()
        .use(codeblocks, { values: 1 })
        .processSync(markdown)
      result = file.data.codeblocks

      it.ok(result[0] === code[0], 'result should be string and match code[i]')
      it.ok(result[1] === code[1], 'result should be string and match code[i]')
    }, 'should not throw')
    it.end()
  })

  t.end()
})
