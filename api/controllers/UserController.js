/**
 * UserController
 *
 * @description :: Server-side logic for managing Usercontrollers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const User = require('../models/User'),
	crypto = require('crypto');

module.exports = {
	create: (req, res) => {
		let body = req.body,
			toCreate = {};
		if (body.email && body.email !== '' && body.password && body.password !== '' && body.passwordConfirm && body.passwordConfirm !== '') {
			if (body.passwordConfirm === body.password) {
				toCreate.username = body.email;
				toCreate.email = body.email;
				toCreate.password = crypto.createHash('md5').update(body.password).digest('hex');
				toCreate.firstname = (body.firstname && body.firstname !== '') ? body.firstname : '';
				toCreate.lastname = (body.lastname && body.lastname !== '') ? body.lastname : '';

				User.addUser(toCreate)
					.exec((err, newUser) => {
						if (!err) {
							console.log(`User ${newUser.id} created.`);
						} else {
							console.log(`Ups an error : ${err}`);
						}
					});
			} else {
				console.log(`Password not equal.`);
			}
		} else {
			console.log(`Form incomplete.`);
		}
	}
};