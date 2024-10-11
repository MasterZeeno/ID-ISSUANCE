import QRCode from 'qrcode'
import QRCodePlaceholder from '@a/qrcode.svg?raw'

const generateQRCode = (idnumber, name, position) => {
  const personnelData = `${idnumber} - ${name} - ${position}`
  let qrString
  
  QRCode.toString(personnelData,
    {
      type: 'svg',
      errorCorrectionLevel: 'L'
    }, (err, svg) => {
      if (err) qrString = QRCodePlaceholder
  
      const svgString = svg
        .replace(/shape-rendering="[^"]*"/g, '')
        .replace(/<path fill="[^"]*" d="[^"]*"\/>/g, '')
        .replace(/#000000/g, 'currentColor')
  
      qrString = svgString
    })
  
  return qrString
}

export default generateQRCode