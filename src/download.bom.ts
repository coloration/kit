export function urlDownload (url: string, name?: string) {
  
  const aDom = document.createElement('a')
  aDom.href = url
  aDom.download = name || 'download'
  aDom.click()

}

export function dataUrlDownload (url: string, name?: string) {

  return urlDownload(url, name)
}