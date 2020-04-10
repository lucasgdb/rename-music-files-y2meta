import fs from 'fs';
import path from 'path';
import beautify from 'beautify.log';

if (!fs.existsSync(path.join(__dirname, '..', 'input'))) {
	beautify.log(
		'{fgred}Make a new dir named `input` and move the downloaded songs inside it.'
	);
} else {
	fs.readdir(path.join(__dirname, '..', 'input'), (err, files) => {
		if (err) throw new Error(err.message);

		if (!fs.existsSync(path.join(__dirname, '..', 'output'))) {
			fs.mkdirSync('output');
		}

		files
			.filter(
				(file) =>
					['.mp3', '.mp4', '3gp', '.m4a', '.webm'].indexOf(
						path.extname(file)
					) !== -1
			)
			.forEach((file) => {
				const newFile = file.replace('y2mate.com - ', '').split('_');
				const extension = path.extname(file);

				if (newFile.length > 1) {
					const newName = newFile[0]
						.split(' ')
						.map((text) =>
							text.length > 2
								? `${text[0].toUpperCase()}${text.substring(
										1,
										text.length
								  )}`
								: text
						)
						.join(' ');

					fs.copyFile(
						path.join(__dirname, '..', 'input', file),
						path.join(__dirname, `../output/${newName}${extension}`),
						() =>
							beautify.log(
								`{fgred}${file} {fgwhite}mmoved to output folder as {fggreen}${newName}${extension}\x1b[0m`
							)
					);
				}
			});
	});
}
