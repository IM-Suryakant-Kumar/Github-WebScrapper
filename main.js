let url = "https://github.com/topics";
const cheerio = require("cheerio");
const request = require("request");
// const fs = require("fs");
// const path = require("path");
const getRepoPagHtml = require("./repoPage");

request(url, cb);
function cb(err, response, html) {
    if (err) {
        console.log(err);
    } else {
        // console.log(html);
        extractTopicsLink(html);
    }
}
// Extract Topics Links
function extractTopicsLink(html) {
    let $ = cheerio.load(html);
    let topicElems = $(".no-underline.flex-justify-center");
    for (let i = 0; i < topicElems.length; i++) {
        let link = $(topicElems[i]).attr("href");
        let topic = link.split("/").pop();
        let fullLink = "https://github.com" + link;
        getRepoPagHtml(fullLink, topic);
    }
}