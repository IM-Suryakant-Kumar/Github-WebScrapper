// let url = "https://github.com/ljianshu/Blog";
const cheerio = require("cheerio");
const request = require("request");
const getIssuePageHtml = require("./issues");
function getRepoPagHtml(url, topic) {
    request(url, cb);

    function cb(err, response, html) {
        if (err) {
            console.log(err);
        } else {
            // console.log(html);
            extractTopRepoLink(html);
        }
    }
    // Extract Top eight repo Links
    function extractTopRepoLink(html) {
        let $ = cheerio.load(html);
        let repoElems = $(".text-bold.wb-break-word");
        console.log("________________________________________________");
        console.log(topic);
        for (let i = 0; i < 8; i++) {
            let link = $(repoElems[i]).attr("href");
            let fullLink = `https://github.com${link}/issues`;
            // console.log(fullLink);
            let repoName = link.split("/").pop();
            getIssuePageHtml(fullLink, topic, repoName);
        }
        console.log("________________________________________________");
    }
}
module.exports = getRepoPagHtml;