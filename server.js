const express = require('express')
const Busboy = require('busboy')
const path = require('path')
const fs = require('fs')

var app = express();

// 用于上传文件表单
app.get('/', (req, res) => {
  res.send(
    `<!DOCTYPE html>
      <html>
      <body>
        <form action="upload" method="post" enctype="multipart/form-data">
          <h1>选择上传的文件</h1>  
          <input type="file" name="file">
          <input type="submit" value="上传">
        </form>
      </body>
      </html>`
    )
})

// 处理上传文件服务
app.post('/upload', (req, res) => {
  const busboy = new Busboy({ headers: req.headers });
  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    const saveTo = path.join(__dirname, 'uploads', filename);
    file.pipe(fs.createWriteStream(saveTo));
  });

  busboy.on('finish', function () {
    res.send("文件上传成功");
  });

  return req.pipe(busboy);
});


app.listen(3000, function () {
  console.log('服务启动成功：http://localhost:3000');
});