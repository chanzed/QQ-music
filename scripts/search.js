export { Search }

class Search {
  constructor(el) {
    this.$el = el
    this.$input = this.$el.querySelector('#search')
    this.$songs = this.$el.querySelector('.song-list')
    this.$input.addEventListener('keyup', this.onKeyUp.bind(this))
    this.keyword = ''
    this.page = 1
    this.perPage = 20
    this.songs = []
    this.nomore = false
    this.fetching = false
    window.addEventListener('scroll', this.onScroll.bind(this))
  }
  onKeyUp(event) {
    this.keyword = event.target.value.trim()
    if (!this.keyword) {
      this.reset()
    }
    if (event.keyCode !== 13) {
      return
    }
    console.log(event.keyCode)
    this.search()
  }
  onScroll() {
    if (this.nomore) {
      return
    }
    if (document.documentElement.clientHeight + pageYOffset > document.body.scrollHeight - 50) {
      this.search(this.page + 1)
    }
  }
  reset() {
    this.page = 1
    this.keyword = ''
    this.songs = []
    this.$songs.innerHTML = ''
  }
  search(page) {
    if (this.fetching) {
      return
    }
    console.log(this.keyword)
    this.fetching = true
    fetch(`http://localhost:4000/search?keyword=${this.keyword}&page=${page || this.page}`)
      .then(response => response.json())
      .then(json => {
        this.page = json.data.song.curpage
        this.nomore = (json.message ==='no results')
        this.songs.push(...json.data.song.list)
        return json.data.song.list
      })
      .then(songs => this.append(songs))
      .then(() => this.fetching = false, () => this.fetching = false)
  }
  append(songs) {
    let html = songs.map(song => 
      `<li class="song-item">
            <i class="icon icon-music"></i>
            <div class="song-name ellipsis">${song.songname}</div>
            <div class="song-artist ellipsis">${song.singer.map(s => s.name).join(' ')}</div>
      </li>
      `
    ).join("")
   this.$songs.insertAdjacentHTML('beforeEnd', html) 
  }
}