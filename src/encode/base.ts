export function hexToBuffer (str: string) { 
  const bufferArray = new ArrayBuffer(str.length / 2) 
  const uint8View = new Uint8Array(bufferArray) 
  uint8View.forEach((_, i) => { 
    uint8View[i] = parseInt(`0x${str.slice(i * 2, i * 2 + 2)}`) 
  }) 
 
  return bufferArray 
} 
