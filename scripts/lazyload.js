import { log } from "./slider"

export {lazyload}
function lazyload(images) {
  let imgs = [].slice.call(images)
  let observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if(entry.intersectionRatio > 0) {
        loadImage(entry.target, () => {
          observer.unobserve(entry.target)
        })
      }
    })
  }, {threshold: 0.01})
  imgs.forEach(img => observer.observe(img))
  // let onscroll = throttle(function() {
  //   if (imgs.length === 0) {
  //     return window.removeEventListener('scroll', onscroll)
  //   }
  //   imgs = imgs.filter(img => img.classList.contains('lazyload'))
  //   imgs.forEach(img => {
  //     if(inViewport(img)) {
  //       loadImage(img)
  //     }
  //   })
  // }, 300)
  
  // window.addEventListener('scroll', onscroll)
  // window.dispatchEvent(new Event('scroll'))

  // function throttle(fn, wait) {
  //   let prev, timer
  //   return function() {
  //     let curr = Date.now()
  //     let diff = curr - prev
  //     if(!prev || diff >= wait) {
  //       fn.call()
  //       prev = curr
  //     }else if (diff < wait) {
  //       timer = setTimeout(fn, wait - diff )
  //     }
  //   }
  // }
  // function inViewport(image) {
  //   let {top, left, bottom, right} = image.getBoundingClientRect()
  //   let vpWidth = document.documentElement.clientWidth
  //   let vpHeight = document.documentElement.clientHeight
  //   return (
  //      (top > 0 && top < vpHeight || bottom > 0 && bottom < vpHeight) && 
  //      (left > 0 && left < vpWidth || rigth > 0 && right < vpWidth)
  //   )
  // }
  function loadImage(img, callback){
    let image = new Image()
    image.src = img.dataset.src
    image.onload = function() {
      img.src = image.src
      img.classList.remove('lazyload')
      if(typeof callback === 'function') {
        callback.call()
      }
    }
  }
}