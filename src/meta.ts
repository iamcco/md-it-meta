import MarkdownIt  from 'markdown-it';
import YAML from 'js-yaml'

type ISeparates = [string[], string[]]

export declare class Md extends MarkdownIt {
  meta: Record<string, any>
}

export default function (md: Md, separates: ISeparates) {
  return meta.bind(null, md, separates)
}

function get (state: any, line: number) {
  const pos = state.bMarks[line]
  const max = state.eMarks[line]
  return state.src.substr(pos, max - pos)
}

function meta (
  md: Md,
  separates: ISeparates,
  state: any,
  start: number,
  end: number,
) {
  if (start !== 0 || state.blkIndent !== 0) {
    return false
  }
  if (state.tShift[start] < 0) {
    return false
  }
  if (!(separates[0] || ['---']).some(sep => get(state, start).match(new RegExp(`^${sep}$`)))) {
    return false
  }
  const data = []
  let line = start
  while (line < end) {
    line++
    const str = get(state, line)
    if ((separates[1] || ['---']).some(sep => str.match(new RegExp(`^${sep}$`)))) {
      break
    }
    if (state.tShift[line] < 0) {
      break
    }
    data.push(str)
  }

  md.meta = YAML.safeLoad(data.join('\n'), { json: true }) || {}
  state.line = line + 1
  return true
}
