const fs = require('fs')
const path = require('path')

fs.readdir(__dirname, (err, files) => {
    files.forEach(async file => {
        const newFile = file.replace('y2mate.com - ', '').split('_')

        file.includes('.mp3') && newFile.length > 1 && await fs.rename(
            path.join(__dirname, file),
            path.join(__dirname, `${newFile.slice(0, newFile.length - 1).map(text => text.length > 2 ? `${text[0].toUpperCase()}${text.substring(1, text.length)}` : text).join(' ')}.mp3`),
            () => { }
        )
    })
})
