import { curry, isWebEnv } from '../operator/index'

export type HTMLElementPosition = {
  left: number, top: number, width: number, height: number
}

export function getOffset (parentDom: HTMLElement, dom: HTMLElement): HTMLElementPosition {
  const def = { width: 0, height: 0, left: 0, top: 0 }
  if (!isWebEnv()) return def

  def.width = dom.offsetWidth
  def.height = dom.offsetHeight
  while (dom && dom !== parentDom) {
    def.left = def.left + dom.offsetLeft
    def.top = def.top + dom.offsetTop
    dom = dom.offsetParent as HTMLElement
  }

  return def

}

export const getOffsetFromBody: (dom: HTMLElement) => HTMLElementPosition 
  = curry(getOffset, isWebEnv() ? globalThis.document.body : globalThis)