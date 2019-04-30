import meta, { Md } from './meta'

export default function (separates: [string[], string[]] = [['---'], ['---']]) {
  return function (md: Md) {
    md.meta = md.meta || {}
    md.block.ruler.before(
      'code',
      'meta',
      meta(md, separates),
      { alt: [] }
    )
  }
}
