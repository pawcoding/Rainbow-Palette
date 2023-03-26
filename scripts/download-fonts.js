const fs = require('fs');
const https = require('https')
const path = require("path");


const PREFIX = 'FONT_DOWNLOADER: '
const FILE_REGEX = /url\('\/assets\/fonts\/.*'\) /g;
const BASE_URL = 'https://colors.apps.pawcode.de/assets/fonts/'
const BASE_PATH = path.join(__dirname, '..', 'dist', 'rainbow-palette', 'assets', 'fonts')


async function downloadFile(url, file) {
  console.log(PREFIX + `Downloading ${file} via ${url}`)

  return new Promise((resolve, reject) => {
    https
      .get(url, response => {
        const code = response.statusCode ?? 0

        if (code >= 400)
          reject(new Error(response.statusMessage))

        if (code > 300 && code < 400 && !!response.headers.location)
          return resolve(downloadFile(response.headers.location, file))

        const fileWriter = fs.createWriteStream(path.join(BASE_PATH, file))
          .on('finish', () => {
            resolve()
          })
          .on('error', err => {
            reject(err)
          })

        response.pipe(fileWriter)
      })
      .on('error', err => {
        reject(err)
      })
  })
}

async function downloadFiles(files) {
  return Promise.all(files.map(file =>
    downloadFile(BASE_URL + file, file)
  ))
}


const css = fs.readFileSync(path.join(BASE_PATH, '..', 'fonts.css'))

const matches = css.toString().match(FILE_REGEX)
const files = matches.map(string => string.replace(/(url\('\/assets\/fonts\/|'\) )/g, ''))

if (!fs.existsSync(BASE_PATH))
  fs.mkdirSync(BASE_PATH)

downloadFiles(files)
  .then(() => {
    console.log(PREFIX + 'Downloading fonts successful')
    process.exit(0)
  })
  .catch(err => {
    console.error(PREFIX + 'Error while downloading files', err)
    process.exit(1)
  })
