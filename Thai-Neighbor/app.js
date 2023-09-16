const request = require('request');
const cheerio = require('cheerio');

// request('https://www.xn--12cg1cxchd0a2gzc1c5d5a.net/%e0%b8%81%e0%b8%a3%e0%b8%b8%e0%b8%87%e0%b9%80%e0%b8%97%e0%b8%9e%e0%b8%a1%e0%b8%ab%e0%b8%b2%e0%b8%99%e0%b8%84%e0%b8%a3/', (error, response, html) => {
    // console.log(html)
// })
let $ = cheerio.load('https://www.xn--12cg1cxchd0a2gzc1c5d5a.net/%e0%b8%81%e0%b8%a3%e0%b8%b8%e0%b8%87%e0%b9%80%e0%b8%97%e0%b8%9e%e0%b8%a1%e0%b8%ab%e0%b8%b2%e0%b8%99%e0%b8%84%e0%b8%a3/')
let d = $('meta[property="og:description"]').attr("content") || $('meta[name="description"]').attr("content");
console.log(d)