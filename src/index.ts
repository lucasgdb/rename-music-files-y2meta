import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

function convert() {
   const inputPath = path.resolve(__dirname, '..', 'input');

   if (!fs.existsSync(inputPath)) {
      // eslint-disable-next-line no-console
      console.warn(
         `${chalk.red(
            'Make'
         )} a new dir named 'input' and move the downloaded songs inside it.`
      );

      return;
   }

   fs.readdir(inputPath, (err, files) => {
      if (err) throw new Error(err.message);

      const outputPath = path.resolve(__dirname, '..', 'output');
      if (!fs.existsSync(outputPath)) {
         fs.mkdirSync('output');
      }

      const musicFiles = files.filter((file) => {
         const musicFileExtension = path.extname(file);
         const musicFilesExtensions = ['.mp3', '.mp4', '3gp', '.m4a', '.webm'];
         return musicFilesExtensions.includes(musicFileExtension);
      });

      musicFiles.forEach((musicFile) => {
         const newFile = musicFile
            .replace('y2mate.com - ', '')
            .replace(/ {2}/g, ' ');

         fs.copyFile(
            path.resolve(__dirname, '..', 'input', musicFile),
            path.resolve(__dirname, '../output/', newFile),
            () => {
               // eslint-disable-next-line no-console
               console.info(
                  `${chalk.red(musicFile)} ${chalk.white('->')} ${chalk.green(
                     newFile
                  )}`
               );
            }
         );
      });
   });
}

convert();
