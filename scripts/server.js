const express = require('express')
const request = require('request-promise')
const cors = require('cors')
const app = express()
const Headers = {
  "authority": "u.y.qq.com",
  "origin": "https://y.qq.com",
  "referer": "https://y.qq.com/m/index.html?tab=recommend",
  "accept": "application/json",
  "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1"
}
app.use(cors())
app.get('/', async (req, res) => {
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg?cgiKey=GetHomePage&_=1572504035905&data={%22comm%22:{%22g_tk%22:5381,%22uin%22:%22%22,%22format%22:%22json%22,%22inCharset%22:%22utf-8%22,%22outCharset%22:%22utf-8%22,%22notice%22:0,%22platform%22:%22h5%22,%22needNewCode%22:1},%22MusicHallHomePage%22:{%22module%22:%22music.musicHall.MusicHallPlatform%22,%22method%22:%22MobileWebHome%22,%22param%22:{%22ShelfId%22:[101,102,161]}},%22hotkey%22:{%22module%22:%22tencent_musicsoso_hotkey.HotkeyService%22,%22method%22:%22GetHotkeyForQQMusicMobile%22,%22param%22:{%22remoteplace%22:%22txt.miniapp.wxada7aab80ba27074%22,%22searchid%22:%221559616839293%22}}}'

  try {
    res.json(await request({
      uri: url,
      json: true,
      headers: Headers
    }))
  } catch (e) {
    res.json({ error: e.message })
  }
})
app.get('/search', async (req, res) => {
  let { keyword, page } = req.query
  console.log(req.query)
  const url = `https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?_=${+ new Date()}&g_tk=5381&uin=&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&w=${encodeURIComponent(keyword)}&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=20&p=${page}&remoteplace=txt.mqq.all`
  try {
    res.json(await request({
      uri: url,
      json: true,
      headers: Headers
    }))
  } catch (e) {
    res.json({ error: e.message })
  }
})
app.listen(4000)
// curl "https://u.y.qq.com/cgi-bin/musicu.fcg?_=1572503783424^&data=^\{^%^22comm^%^22:^\{^%^22g_tk^%^22:5381,^%^22uin^%^22:^%^22^%^22,^%^22format^%^22:^%^22json^%^22,^%^22inCharset^%^22:^%^22utf-8^%^22,^%^22outCharset^%^22:^%^22utf-8^%^22,^%^22notice^%^22:0,^%^22platform^%^22:^%^22h5^%^22,^%^22needNewCode^%^22:1^\},^%^22playSongAd^%^22:^\{^%^22module^%^22:^%^22SongPlay.SongPlayBaseServer^%^22,^%^22method^%^22:^%^22GetPlaySongAd^%^22,^%^22param^%^22:^\{^%^22channel^%^22:3,^%^22app_user^%^22:1,^%^22platform^%^22:2,^%^22forbid^%^22:0,^%^22share_musicid^%^22:^%^22^%^22,^%^22encodetype^%^22:1,^%^22adtype^%^22:8^\}^\}^\}" -H "authority: u.y.qq.com" -H "accept: application/json" -H "origin: https://y.qq.com" -H "user-agent: Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1" -H "sec-fetch-site: same-site" -H "sec-fetch-mode: cors" -H "referer: https://y.qq.com/m/index.html?tab=recommend" -H "accept-encoding: gzip, deflate, br" -H "accept-language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7" -H "cookie: pgv_pvi=4816616448; RK=dwpxA6ioeX; ptcz=102176180b55a467f5f0d603d5b2f4f2b74b774d5969d46a8e4cc8810e2915e6; tvfe_boss_uuid=6f38e7d88de7796c; pgv_pvid=6376785330; o_cookie=1141076095; ptui_loginuin=1141076095; eas_sid=m1z5i6A9B0I4A3b2t3c1O9c1W5; ts_uid=6578367104; yq_index=0; userAction=1; yqq_stat=0; pgv_info=ssid=s1050080461; ts_refer=www.google.com/; pgv_si=s3116823552; ts_last=y.qq.com/m/index.html" --compressed