import '@css/style.css'
import banner from '@a/banner.svg?raw'
import generateQRCode from '@js/generateQRCode.js'
import autocrop from '@js/autocrop.js'
import masterlist from '@js/masterlist.js'

const resolveString = (str = 'dummy') => {
  return String(str).toUpperCase()
}

const resolveImagePath = (imagePath) => {
  return `/images/${imagePath}`
}

const getTemplate = (data, index = 1) => {
  const { name, position } = data
  const resolvedName = resolveString(name)
  const resolvedPosition = resolveString(position)
  const imagePath = `/images/${resolvedName} - ${resolvedPosition}.jpeg`

  const idnumber = `HCC-NSBP2-${String(index).padStart(4, '0')}`
  const qrcodeString = generateQRCode(idnumber, resolvedName, resolvedPosition)

  return `<div class="id-card front"><div class="top-part"><div class="banner-container">${banner}</div></div><div class="bot-part"></div><div class="info"><div data-name="${resolvedName}" data-position="${resolvedPosition}" class="profile-photo"><canvas style="opacity:0" width="153" height="153"></canvas><img hidden src="${imagePath}"></div><div class="details"><p class="idnumber">${idnumber}</p><p class="name">${resolvedName}</p><p class="position">${resolvedPosition}</p></div><div class="qrcode-container">${qrcodeString}</div></div></div><div class="id-card back"></div>`
}

const contents = masterlist.map((person, index) => {
  return getTemplate(person, index + 1)
})

document.querySelector('#app').innerHTML = contents.join('\n')

autocrop()