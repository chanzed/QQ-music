import { Slider, log } from './slider.js'
import '../scripts/tab.js'
import { lazyload } from './lazyload.js'
import { Search } from './search.js'
!function () {
  fetch('../json/rec.json')
    .then(response => response.json())
    .then(render)

  fetch('../json/rank.json')
    .then(response => response.json())
    .then((json) => {
      renderRank(json.req_0.data.group)
      lazyload(document.querySelectorAll('.lazyload'))
    })
  new Search(document.querySelector('.search-view'))

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
    log(radios)
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

  function renderRank(groups) {

    document.querySelector('.rank').innerHTML = groups.map(group =>{
      log('group', group)
      return createRankItem(group.toplist)
    }).join('')
  }
  function createRankListItem(songs) {
    let i = 1
    return songs.map(song => 
                `<li class="rank-list-item">${i++}<span class='song-name'>${song.title}</span>-${song.singerName}</li>`
                ).join('')
  }
  function createRankItem(topList) {
    return topList.map(top => 
      `<div class="rank-item">
          <div class="rank-picture-wrapper">
            <img class='rank-picture lazyload' data-src="${top.headPicUrl}"
              alt="图片">
          </div>
          <div class="rank-list">
            <h3 class="rank-list-title">${top.title}</h3>
            <ul class="rank-list-items">
              ${createRankListItem(top.song)}
            </ul>
          </div>
          <div class="rank-item-arrow"></div>
        </div>
      `).join('')
  }
}()