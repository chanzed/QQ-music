document.addEventListener('click', function (event) {
  let target = event.target
  if (target.dataset.role !== 'tab') {
    return
  }
  let content = document.querySelector(target.dataset.view);
  [].forEach.call(target.parentElement.children, child => {
    child.classList.remove('active')
  })
  target.classList.add('active')
  if (content) {
    ([]).forEach.call(content.parentElement.children, function (node) {
      node.classList.add('hide')
    })
  }
  content.classList.remove('hide')
})