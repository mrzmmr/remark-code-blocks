const unified = require('unified')
const parser = require('remark-parse')
const stringify = require('remark-stringify')
const { test } = require('tap')

const codeblocks = require('.')

test('remark-code-blocks', t => {
  const mixLang = '# Test\n```\nconst a = 42\n```\n\n```go metaTextOne\nfmt.Println("Hi")\n```'
  const noLang = '# Test\n```\nconst a = 42\n```'
  const processor = unified()
    .use(parser)
    .use(stringify)

  t.test('standalone function', it => {
    const tree = unified()
      .use(parser)
      .parse(noLang)
    const code = codeblocks.codeblocks(tree)

    it.ok(
      code.codeblocks,
      'It should return an object with a codeblocks property'
    )
    it.ok(
      Array.isArray(code.codeblocks._),
      'It should create a `_` property in `codeblocks`'
    )
    it.end()
  })

  t.test('with codeblocks already taken', it => {
    let file = processor().processSync(noLang)
    file.data.codeblocks = {_: []}
    let newFile = processor()
      .use(codeblocks)
      .processSync(file)
    it.ok(
      newFile.data.codeblocks._,
      'it should not replace already stored.'
    )
    it.end()
  })

  t.test('it should work without options', it => {
    let p = processor().use(codeblocks)

    it.ok(
      p.processSync(noLang).data.codeblocks,
      'it should create a `codeblocks` property in vfile.data'
    )

    it.ok(
      Array.isArray(p.processSync(noLang).data.codeblocks._),
      'it should create a `_` property in `codeblocks` for nodes with no lang'
    )
    it.end()
  })

  t.test('it should change prop name in VFile.data based options.name', it => {
    let p = processor().use(codeblocks, { name: 'code' })
    it.ok(
      p.processSync(noLang).data.code,
      'it should change name for property'
    )
    it.end()
  })

  t.test('it should only select code nodes with specified lang from options', it => {
    let p = processor().use(codeblocks, { name: 'code', lang: 'go' })
    it.ok(
      Array.isArray(p.processSync(mixLang).data.code),
      'When lang options is specified store in array'
    )
    it.ok(
      p.processSync(mixLang).data.code[0] === 'fmt.Println("Hi")',
      'it should only select one language'
    )
    it.end()
  })

  t.test('it should only select code nodes with specified lang and custom validator from options', it => {
    const validator = (node) => node.meta === "metaTextOne";

    let p = processor().use(codeblocks, { name: 'code', lang: 'go', validator })
    it.ok(
      Array.isArray(p.processSync(mixLang).data.code),
      'When lang and validator options is specified store in array'
    )
    it.ok(
      p.processSync(mixLang).data.code[0] === 'fmt.Println("Hi")',
      'it should only select one language and custom validator'
    )

    it.end()
  })

  t.test('it should empty with custom validator from options', it => {
    const validator = (node) => node.meta === "metaTextTwo";

    let p = processor().use(codeblocks, { name: 'code', validator })
    console.log(p.processSync(mixLang).data);
    it.ok(
      Object.keys(p.processSync(mixLang).data.code).length === 0,
      'it should empty'
    )

    it.end()
  })

  t.end()
})
