import '@css/style.css'
import fs from 'node:fs'
import path from 'node:path'
import placeholder from '/placeholder.svg?url'
import banner from '/banner.svg?raw'
import generateQRCode from '@js/generateQRCode.js'
import masterlist from '@js/masterlist.js'

const resolveString = (str = 'dummy') => {
  return String(str).toUpperCase()
}

const resolveImagePath = (imagePath) => {
  const imageRelPath = path.join('/images', imagePath)
  return fs.existsSync(imageRelPath) ?
    imageRelPath : placeholder
}

const getTemplate = (data, index = 1) => {
  const { name, position } = data
  const resolvedName = resolveString(name)
  const resolvedPosition = resolveString(position)
  const imagePath = `/images/${resolvedName} - ${resolvedPosition}.jpeg`

  const idnumber = `HCC-NSBP2-${String(index).padStart(4, '0')}`
  const qrcodeString = generateQRCode(idnumber, resolvedName, resolvedPosition)

  return `
  <div>
    <div class="id-card front">
      <div class="top-part">
        <div class="banner-container">
          ${banner}
        </div>
      </div>
      <div class="bot-part">
      </div>
      <div class="info">
        <div class="profile-photo">
          <img src="${imagePath}" alt="${resolvedName}" />
        </div>
        <div class="details">
          <p class="idnumber">${idnumber}</p>
          <p class="name">${resolvedName}</p>
          <p class="position">${resolvedPosition}</p>
        </div>
        <div class="qrcode-container">
          ${qrcodeString}
        </div>
      </div>
    </div>
    <div class="id-card back">
    </div>
  </div>
`
}

const contents = masterlist.map((person, index) => {
  // const content = await template(person.name, person.position, index + 1)
  return getTemplate(person, index + 1)
})

document.querySelector('#app').innerHTML = contents.join('\n')