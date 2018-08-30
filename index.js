module.exports = options => (tree, file) => {
  const settings = options || {}
  const formatter = settings.formatter || (v => v)
  const lang = settings.lang || 'all'
  const { children } = tree
  let i = -1
  let child

  while (++i < children.length) {
    child = children[i]

    if (!file.data.codeblocks) {
      file.data.codeblocks = []
    }

    if (child.type === 'code') {
      if (lang === 'all' || child.lang === lang) {
        file.data.codeblocks.push(formatter(child.value))
      }
    }
  }

  // Theres no need for the property if its empty.
  if (file.data.codeblocks.length === 0) {
    delete file.data.codeblocks
  }
}
