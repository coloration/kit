export function loadImage (src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.addEventListener('load', function () {
      resolve(img)
    })

    img.addEventListener('error', function (ev) {
      reject(ev)
    })

    img.src = src
  })
}