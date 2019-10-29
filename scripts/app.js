import { Slider, log } from './slider.js'
import '../scripts/tab.js'
import { lazyload } from './lazyload.js'
!function () {
  fetch('../json/rec.json')
    .then(response => response.json())
    .then(render)

  function render(json) {
    renderSlider(json.data.slider)
    renderRadios(json.data.radioList)
    renderSongsList(json.data.songList)
    lazyload(document.querySelectorAll('.lazyload'))
  }
  function renderSlider(slides) {
    slides = slides.map(slide => {
      return { link: slide.linkUrl, image: slide.picUrl }
    })
    new Slider({
      el: document.querySelector('#slider'),
      slides: slides
    })
  }
  
  function renderRadios(radios) {
    document.querySelectorAll('.radios .radios-list')[0].innerHTML = radios.map(radio => 
      `<div class="radios-list-item">
        <img class='lazyload' data-src="${radio.picUrl}" alt="图片">
        <span class="icon icon-play"></span>
        <div class="radios-list-info">${radio.Ftitle}</div>
      </div>`
    ).join('')
  }
  function renderSongsList(songs) {
    document.querySelectorAll('.radios .radios-list')[1].innerHTML = songs.map(song => 
      `<div class="radios-list-item">
        <img class='lazyload' data-src="${song.picUrl}" alt="图片">
        <span class="icon icon-play"></span>
        <div class="radios-list-info">${song.songListDesc}</div>
      </div>`
    ).join('')

  }
}()