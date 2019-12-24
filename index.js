const fs = require('fs')
const path = require('path')

fs.readdir(__dirname, (err, files) => {
    if (err) throw new Error(err)

    if (!fs.existsSync(path.join(__dirname, 'output'))) fs.mkdirSync('output')

    files
        .filter(file => ['.mp3', '.mp4', '3gp', '.m4a', '.webm'].indexOf(path.extname(file)) !== -1)
        .forEach(async file => {
            const newFile = file.replace('y2mate.com - ', '').split('_')
            const extension = path.extname(file)

            if (newFile.length > 1) {
                const newName = newFile.slice(0, newFile.length - 1).map(text => text.length > 2 ? `${text[0].toUpperCase()}${text.substring(1, text.length)}` : text).join(' ')

                await fs.copyFile(
                    path.join(__dirname, file),
                    path.join(__dirname, `./output/${newName}${extension}`),
                    () => console.log(`\x1b[31m${file}\x1b[0m moved to output folder as \x1b[32m${newName}${extension}\x1b[0m`)
                )
            }
        })
})
