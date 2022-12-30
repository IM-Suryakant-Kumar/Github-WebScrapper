const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");
const path = require("path");
const pdfkit=require("pdfkit");
function getIssuePageHtml(url, topic, repoName) {
    request(url, cb);
    function cb(err, response, html) {
        if (err) {
            console.log(err);
        } else if (response.statusCode == 404) {
            console.log("Page not found");
        }
        else {
            // console.log(html);
            getIssues(html);
        }
    }
    function getIssues(html) {
        let $ = cheerio.load(html);
        let issueElems = $("a[data-hovercard-type=\"issue\"]");
        let arr = [];
        for (let i = 0; i < issueElems.length; i++) {
            let link = $(issueElems[i]).attr("href");
            // console.log(link);
            arr.push(link);
        }
        console.log(topic,"        ", arr);
        let folderPath = path.join(__dirname, topic);
        dirCreator(folderPath);
        let filePath=path.join(folderPath, repoName+".pdf");
        let text = JSON.stringify(arr);
        let pdfDoc=new pdfkit();
        pdfDoc.pipe(fs.createWriteStream(filePath));
        pdfDoc.text(text);
        pdfDoc.end();
        // fs.writeFileSync(filePath, );
    }
}
module.exports = getIssuePageHtml;
function dirCreator(folderPath) {
    if (!(fs.existsSync(folderPath))) {
        fs.mkdirSync(folderPath);
    }
}

// pdfkit arcticle https://stackabuse.com/generating-pdf-files-in-node-js-with-pdfkit/