import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

function logCopiedFiles(fileName: string, newFileName: string) {
   console.info(
      `${chalk.red(fileName)} ${chalk.white('->')} ${chalk.green(newFileName)}`
   );
}

function convert() {
   const inputPath = path.resolve(__dirname, '..', 'input');

   if (!fs.existsSync(inputPath)) {
      fs.mkdirSync('input');
   }

   fs.readdir(inputPath, (err, files) => {
      if (err) {
         throw new Error(err.message);
      }

      const outputPath = path.resolve(__dirname, '..', 'output');
      if (!fs.existsSync(outputPath)) {
         fs.mkdirSync('output');
      }

      const songFileNames = files.filter((file) => {
         const songFileExtension = path.extname(file);
         const songFilesExtensions = ['.mp3', '.mp4', '3gp', '.m4a', '.webm'];
         return songFilesExtensions.includes(songFileExtension);
      });

      if (songFileNames.length === 0) {
         console.warn(chalk.red('Please copy song files to "input" folder.'));
         return;
      }

      songFileNames.forEach((songFileName) => {
         const newFileName = songFileName
            .replace('y2meta.com - ', '')
            .replace(/ {2,}/g, ' ')
            .replace(/ \([\d]{3,4} kbps\)/g, '')
            .replace(/ \([A-Z]{1,}\)/gi, '');

         fs.copyFile(
            path.resolve(__dirname, '..', 'input', songFileName),
            path.resolve(__dirname, '../output/', newFileName),
            () => logCopiedFiles(songFileName, newFileName)
         );
      });
   });
}

convert();
