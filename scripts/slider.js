export { Slider, log }
class Slider {
  constructor({ el, slides, interval }) {
    this.el = el
    this.slides = slides
    this.interval = interval || 3000
    this.index = 0
    this.render()
    this.start()
  }
  render() {
    console.log(2)
    this.el.innerHTML = `<div id=slider-wrapper class=slider-wrapper></div>`
    this.wrap = this.el.firstElementChild

    this.wrap.innerHTML = this.slides.map(slide =>
      ` <div class="slider-items">
        <a href="${slide.link}">
          <img src="${slide.image}" alt="图片">
        </a>
      </div> `
    ).join('')
  }

  // makeFakeNode() {
  //   let firstCopy = this.wrap.firstElementChild.cloneNode(true)
  //   let lastCopy = this.wrap.lastElementChild.cloneNode(true)
  //   this.wrap.insertAdjacentElement('afterbegin', lastCopy)
  //   this.wrap.insertAdjacentElement('beforeend', firstCopy)
  // }
  start() {
    setInterval(this.next.bind(this), this.interval);
  }
  next() {
    this.index = (this.index + 1) % this.wrap.children.length
    this.wrap.style.transform = `translateX(-${this.index * 100}vw)`
  }
}
function log() {
  return console.log.apply(console.log, arguments)
}