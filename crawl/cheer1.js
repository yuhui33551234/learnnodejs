const https = require('https');
const cheerio = require('cheerio');
const fs = require('fs');

let page = 1
let endPage = 50 // 最后一页
let url = `https://cnodejs.org/?tab=all&page=${page}`
let dataSource = []; // 存储数据
let dataLength = 0; // 数据长度
grabPage(url);

function grabPage(url) { // 抓取页面
  if (page === 1) {
    console.log('开始请求数据!');
  }
  console.log('开始处理第'+page+"页");
  sendRequest(url) // 发送请求
};

function sendRequest(url) {
  https.get(url, res => {
    
    console.log('开始解析数据:'+page);
    let _html = '';
    res.on('data', chunk => {
      _html += chunk;
    })

    res.on('end', () => {
      const $ = cheerio.load(_html);
      let cell = $('.cell');
      let len = cell.length;
      dataLength += len;
      if (len === 0 || page === endPage) {
        if (dataLength > 0) {
          console.log('开始存储文件');
          saveFile(dataSource); // 储存之json文件
        }
        return
      }
      cell.each(function (i) {
        let temp = {
          "id": i,
          "avatar": "", // 头像
          "response": "",// 回复
          "view": "",// 查看
          "title": "",// 标题
          "href": "", // 标题链接
          "lastTimeAvatar": "", // 最后回复人的头像
          "date": "" // 事件
        }
        temp.avatar = $(this).find('.user_avatar img').attr('src');
        temp.response = $(this).find('.reply_count .count_of_replies').text();
        temp.view = $(this).find('.reply_count .count_of_visits').text();
        temp.title = $(this).find('.topic_title_wrapper .topic_title').text();
        temp.href = $(this).find('.topic_title_wrapper .topic_title').attr('href');
        temp.lastTimeAvatar = $(this).find('.last_time img').attr('src');
        temp.date = $(this).find('.last_time .last_active_time').text();
        dataSource.push(temp);
      })
      page++;
      grabPage(url);
    })
  }).on('error', error => console.log(error))
}

function saveFile(data) {
  fs.appendFile('text.json', JSON.stringify(data), 'utf-8', function (err) {
    if (err) {
      console.log(err)
      return
    }
    console.log('存储文件完成!');
    console.log(`成功抓取${dataLength}条数据`);
  })
}