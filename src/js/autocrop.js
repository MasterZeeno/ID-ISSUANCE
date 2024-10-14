export async function loadModels() {
  const mf = '/models'
  await Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromUri(mf),
    faceapi.nets.faceLandmark68Net.loadFromUri(mf)
    // faceapi.nets.faceRecognitionNet.loadFromUri(mf)
  ])
}

async function crop(parent) {
  const img = parent.querySelector('img')
  const c = parent.querySelector('canvas')

  if (!img || !c) return

  img.height = c.height
  img.width = c.width

  const rfd = await faceapi.detectAllFaces(img).withFaceLandmarks()

  if (!rfd.length) return

  const { alignedRect: ar, detection } = rfd[0]
  const { x, y, width, height } = ar.box
  const { width: imgWidth, height: imgHeight } = detection.imageDims

  const rw = Math.min(imgWidth, width * 2)
  const rh = Math.min(imgHeight, height * 2)
  const rx = Math.max(0, x - (rw / 4))
  const ry = Math.max(0, y - (rh / 3))
  
  const ctx = c.getContext('2d')

  requestAnimationFrame(() => {
    // cropFaceFromImage(img, c, rx, ry, rw, rh)
    ctx.clearRect(0, 0, c.width, c.height)
    ctx.drawImage(img, rx, ry, rw, rh, 0, 0, c.width, c.height)
    c.removeAttribute("style")
  })
}

export async function autocrop() {
  window.onload = async () => {
    await loadModels()
    document.querySelectorAll('.profile-photo').forEach(async (parent) => {
      await crop(parent)
    })
  }
}

export default autocrop