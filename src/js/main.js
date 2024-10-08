import '@css/style.css'
import banner from '/banner.svg?raw'
import qrcode from '/qrcode.svg?raw'
import profile from '/profile.jpg?url'

document.querySelector('#app').innerHTML = `
  <div>
    <div class="id-card front">
      <div class="top-part">
        <div class="banner-container">
          ${banner}
        </div>
      </div>
      <div class="info">
        <div class="profile-photo">
          <img src="${profile}" alt="ID Picture" />
        </div>
        <div class="details">
          <h2 class="project">NSB PHASE II</h2>
          <h4 class="id_number">HCC-NSBP2-0001</h4>
          <div class="qrcode-container">
            ${qrcode}
          </div>
        </div>
      </div>
    </div>
    <div class="id-card back">
    </div>
  </div>
`
