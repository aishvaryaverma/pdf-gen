var fs = require("fs");
const { resolve } = require("path");

module.exports = async (req, res) => {
	res.status(500).send('Internal Server Error');
	// try {
	// 	var html = fs.readFileSync(resolve('./templates/form.html'), "utf8");
	// 	res.status(200).send(html);
	// } catch (err) {
	// 	res.status(301).redirect('/');
	// }
};
