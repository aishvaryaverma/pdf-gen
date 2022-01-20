//Required package
const fs = require("fs");
const path = require("path");
const moment = require('moment');
const pdf = require("pdf-creator-node");

module.exports = async (req, res) => {
	const { query } = req;
	if (query.password !== process.env.PASSWORD) {
		res.redirect('/');
		return;
	}
	try {
		// read image
		const bitmap = fs.readFileSync(path.resolve('./public/bg.png'));
		const logo = bitmap.toString('base64');
		// file
		const html = fs.readFileSync(path.resolve('./templates/pdf.html'), "utf-8");

		const today = new Date();
		const formatDate = (date = today) => moment(date).format('DD MMM, YYYY');

		const doc = await pdf.create({
			path: `certificates/${query.name}.pdf`,
			type: '',
			html: html,
			data: {
				logo,
				user: {
					...query,
					name: `${query.title}.${query.name}`,
					wef: formatDate(query.wef),
				},
				date_created: formatDate(),
			},
		}, {
			width: '1280px',
			height: '930px',
			border: "20px",
			// format: "A4",
			// orientation: 'portrait',
		});
		// res.sendFile(doc.filename);
		res.download(doc.filename, () => {
			fs.unlinkSync(doc.filename);
			console.log('downloaded and deleted successfully filename:', doc.filename);
		});
	} catch (err) {
		console.log('Error creating pdf', err);
		res.status(301).redirect('/');
	}
};
