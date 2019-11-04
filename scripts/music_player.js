import { ProgressBar } from "./progress_bar"

export { MusicPlayer }
class MusicPlayer {
  constructor(el) {
    this.$el = el
    this.$icon = this.$el.querySelector('.icon')
    this.$iconList = this.$el.querySelector('.icon-list')
    this.bindEvents()
    this.progress = new ProgressBar(this.$el.querySelector('.progress'), 10, true)
  }
  createAudio() {
    this.$audio = document.createElement('audio')
    this.$audio.loop = true
    this.$autio.id = `player-${Math.floor(Math.random() * 100)}-${+new Date()}`
    document.appendChild('this.$audio')
  }
  bindEvents() {
    this.$icon.addEventListener('click', this.onPlay.bind(this))
    this.$iconList.addEventListener('click', this.hide.bind(this))
  }
  onPlay(event) {
    console.log(event.target);
    [].forEach.call(this.$icon.children, (child) => {
      child.classList.toggle('hide')
    })
  }
  play() {

  }
  show() {
    this.$el.classList.remove('hide')   
  }
  hide() {
    this.$el.classList.add('hide')   
    this.progress.pause()
  }
}