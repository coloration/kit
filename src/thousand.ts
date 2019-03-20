// 逗号分隔数字
export default function thousand (t: any): string {
  if (isNaN(Number(t))) return String(t)
  return String(t).replace(/(\d)(?=(?:\d{3}))/g, '$1,')
}