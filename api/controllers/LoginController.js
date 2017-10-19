const loginModel = require('../models/Login');


module.exports = {
	hi: function(req, res) {
		// loginModel.addUser('christian.gimenez@sigis.com.ve', 'casa1234');
		// return res.send('Hi there!');
	},
	bye: function(req, res) {
		return res.redirect('http://www.sayonara.com');
	}
};