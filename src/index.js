'use strict'

/**
 * Remark code blocks
 *
 * Extracts code blocks from an mdast tree and stores them in vfiles data object.
 */

const findAllAfter = require('unist-util-find-all-after')

module.exports = (options = {}) => {
  return (tree, file) => {
    const { values, lang } = options
    let codeblocks
    let nodes = []

    nodes = findAllAfter(tree, 0, 'code')

    if (tree.children[0].type === 'code') {
      nodes.unshift(tree.children[0])
    }

    codeblocks = nodes

    if (lang) {
      nodes = codeblocks
      codeblocks = nodes.filter(node => node.lang === lang)
    }

    if (values) {
      nodes = codeblocks
      codeblocks = nodes.map(node => node.value)
    }

    file.data.codeblocks = codeblocks
  }
}
