import '@css/style.css'
import banner from '@a/banner.svg?raw'
import generateQRCode from '@js/generateQRCode.js'
import autocrop from '@js/autocrop.js'
import masterlist from './masterlist.json'

// const resolveString = (str = 'dummy') => {
  // return String(str).toUpperCase()
// }

const getTemplate = (data) => {
  const { id, name, position, photo } = data
  const resolvedName = name.toUpperCase()
  const resolvedPosition = position.toUpperCase()
  const imagePath = `/images/${photo}`

  const idnumber = `HCC-NSBP2-${String(id).padStart(4, '0')}`
  const qrcode = generateQRCode(idnumber, resolvedName, resolvedPosition)
  
  const profDims = `width="${profileSize}" height="${profileSize}"`
  
  return `<div class="id-card front"><div class="top-part"><div class="banner-container">${banner}</div></div><div class="bot-part"></div><div class="info"><div ${profDims} data-name="${resolvedName}" data-position="${resolvedPosition}" class="profile-photo"><canvas style="opacity:0;" ${profDims}></canvas><img hidden src="${imagePath}" ${profDims}></div><div class="details"><p class="idnumber">${idnumber}</p><p class="name">${resolvedName}</p><p class="position">${resolvedPosition}</p></div><div class="qrcode-container">${qrcode}</div></div></div><div class="id-card back"></div>`
}

const profileSize = Math.floor(16 * 9.6)
const personnel = masterlist.personnel

const contents = personnel.map(getTemplate)

document.querySelector('#app').innerHTML = contents.join('\n')

autocrop()