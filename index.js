// твой код


const http = require('http');
const fs = require ('fs');
const path = require ('path');

const server = http.createServer((req, res) => {
  res.writeHead(200);
  fs.readFile(path.resolve(__dirname, 'jokes.txt'), (err, data) => {
    if (err) {
      console.log('ошибка')
    }
    if (req.method === 'POST') {

      let body = '';

      req.on('data', chuck => {
        body = JSON.parse(chuck)
      })

      req.on('end', () => {
        fs.appendFile(path.resolve(__dirname, 'jokes.txt'), body.joke + '\n', () => res.end())
      })
    }
    if (req.method === 'GET'){
      res.write(JSON.stringify({"joke": getRandomLineFromText(data)}))
      }

    res.end()
  })
})
server.listen(3000)

  let getRandomLineFromText = jokes => {
    let chuckNorris = jokes.toString().split('\n');
    let index = Math.floor(Math.random() * 8);
    return chuckNorris[index]
  }




