import { isWebEnv } from "../operator"

export function copyToClipBoard (text: string) {
  if (!isWebEnv()) return Promise.reject(1)
  const selection = globalThis.getSelection()
  if (selection) {
    const target = globalThis.document.createElement('div')
    target.style.opacity = '0'
    target.style.position = 'fixed'
    target.style.zIndex = '-1'

    target.innerHTML = text
    globalThis.document.body.append(target)
    const range = globalThis.document.createRange()

    range.selectNode(target)
    selection.removeAllRanges()
    selection.addRange(range)
    globalThis.document.execCommand('Copy')
    selection.removeAllRanges()
    globalThis.document.body.removeChild(target)

    return Promise.resolve(0)
  }

  return Promise.reject(1)
}
