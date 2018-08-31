module.exports = options => (tree, file) => {
  const settings = options || {}
  const lang = settings.lang || 'all'
  const name = settings.name || 'codeblocks'
  const formatter = settings.formatter || (v => v)

  const { children } = tree
  let i = -1
  let child

  if (!file.data[name]) {
    if (lang === 'all') {
      file.data[name] = {}
    } else {
      file.data[name] = []
    }
  }

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
