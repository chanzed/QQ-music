export { ProgressBar }
class ProgressBar {
  constructor(el, duration, start) {
    this.$el = el
    this.duration = duration || 0
    this.elapsed = 0
    this.render()
    this.$progress = this.$el.querySelector('.progress-bar-progress')
    this.$elapsed = this.$el.querySelector('.progress-elapsed')
    this.$duration = this.$el.querySelector('.progress-duration')
    this.$elapsed.innerText = this.formatTime(this.elapsed)
    this.$duration.innerText = this.formatTime(this.duration)
    this.progress = 0
    this.intervalId = ''
    if (start) {
      this.start()
    }
  }
  start() {
    this.intervalId = setInterval(this.update.bind(this), 50)
  }
  pause() {
    clearInterval(this.intervalId)
  }
  update() {
    this.elapsed += 0.05
    if (this.elapsed >= this.duration) {
      this.reset()
    }
    this.$elapsed.innerText = this.formatTime(this.elapsed)
    this.progress = this.elapsed / this.duration
    this.$progress.style.transform = `translateX(${this.progress * 100 - 100}%)`
  }
  reset(duration) {
    this.pause()
    this.elapsed = 0
    this.progress = 0
    if (duration) {
      this.duration = +duration
      this.$duration.innerText = this.formatTime(this.duration)
    }
  }
  render() {
    this.$el.innerHTML = `
      <div class="progress-time progress-elapsed"></div>
        <div class="progress-bar">
          <div class="progress-bar-progress"></div>
        </div>
      <div class="progress-time progress-duration"></div>
    `
  }
  formatTime(time) {
    let minute = Math.floor(time / 60)
    let second = Math.floor(time % 60)
    if (minute < 10) {
       minute = '0' + minute
    }
    if (second < 10) {
      second = '0' + second
    }
    return minute + ':' + second
  }
}
