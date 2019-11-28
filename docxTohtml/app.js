const fs = require('fs');
const mammoth = require('mammoth');
const join = require('path').join;




getJsonFiles("wordTemplate");

// 文件路径
function getJsonFiles(jsonPath) {
    let jsonFiles = [];

    function findJsonFile(path) {
        let files = fs.readdirSync(path);
        files.forEach(function (item, index) {
            let fPath = join(path, item);
            let stat = fs.statSync(fPath);
            if (stat.isDirectory() === true) {
                findJsonFile(fPath);
            }
            if (stat.isFile() === true) {
                jsonFiles.push(fPath);
            }
        });
    }
    findJsonFile(jsonPath);
    // 循环路径生成html
    getFileArrayToCreateHTML(jsonFiles, 'wordTemplate', 'htmlFile');
}


// 获得文件数组
function getFileArrayToCreateHTML(fileArray, loadWordDir, createHtmlDir) {
    // 重命名word存入路径名称
    let replaceLoadWordDir = `${loadWordDir}\\\\`;
    // 循环路径
    fileArray.forEach((item, index) => {
        let fileName = item.replace(new RegExp(replaceLoadWordDir, ''), '').replace(/.doc/g, '').replace(/x/g, '');
        // 生成html
        mammoth.convertToHtml({
                // 文件路径
                path: `./${loadWordDir}/${fileName}.docx`
            })
            .then(function (result) {
                let html = result.value;
                let messages = result.messages;
                // 头部模板
                let template = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="X-UA-Compatible" content="ie=edge"><link rel="stylesheet" href="./css/style.css"><title>办事指南</title></head><body>${html}</body></html>`
                // 生成
                fs.writeFile(`./${createHtmlDir}/${fileName}.html`, template, function (err) {
                    console.log(`下标${index+1}的文件名为--${fileName}.docx--is saved !!!`);
                });
            })
            .done();
    })
}