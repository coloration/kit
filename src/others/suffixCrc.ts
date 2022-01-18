
import { bufferFromHex } from '../buffer'
/**
 * suffix hex string crc code
 * @param {string} str hex string
 * @returns 
 * @example 
 * suffixCrc('010300000002') // '010300000002C40B'
 */
export function suffixCrc (str: string): string {

  let wcrc = 0xffff // 16位寄存器预置
  const buffer = bufferFromHex(str) 
  const uint8View = new Uint8Array(buffer) 
 
  uint8View.forEach(bf => { 

    wcrc ^= bf & 0x00ff // 将8位数据与crc寄存器异或

    for (let j = 0; j < 8; j++) {
      // 判断右移出的是不是1
      if (wcrc & 0x0001) { // 如果是1则与多项式进行异或
        wcrc >>= 1 // 数据右移一位
        wcrc ^= 0xa001 // 与上面的多项式进行异或
      }
      else { // 如果不是1，则直接移出
        wcrc >>= 1
      }
    }
  })

  const CRC_L = wcrc & 0xff
  const CRC_H = wcrc >> 8
  return str + (CRC_L << 8 | CRC_H).toString(16)

}