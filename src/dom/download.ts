export function download (filename: string, content: any) {
  const link = document.createElement('a')
  link.href = content
  link.download = filename
  link.click()
}

export function downloadAsFile (filename: string, content: Blob) {
  return download(filename, window.URL.createObjectURL(content))
}

export function downloadAsCsv (filename: string, content: string): void {
  content = '\ufeff' + content
  const blob = new Blob([content], { type: 'text/csv,charset=UTF-8' })
  return downloadAsFile(filename + '.csv', blob)
}