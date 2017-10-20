/**
 * UserController
 *
 * @description :: Server-side logic for managing Usercontrollers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const User = require('../models/User'),
	response = require('../utils/response'),
	crypto = require('crypto');

module.exports = {
	signIn: (req, res) => {
		let body = req.body,
			toFind = {};
		if (body.username && body.username !== '' && body.password && body.password !== '') {
			toFind.username = body.username;
			toFind.password = crypto.createHash('md5').update(body.password).digest('hex');

			User.signIn(toFind)
				.exec((err, finded) => {
					if (!err) {
						if (finded) {
							response.customResponse(res, 200, finded, null);
							sails.log.info(`User ${finded.id} Sign In`);
						} else {
							response.customResponse(res, 400, null, `Username or Password invalid.`);
							sails.log.warn(`Username or Password invalid.`);
						}
					} else {
						sails.log.error(new Error(`Ups, got an error :/ ${err}`));
					}
				});
		} else {
			response.customResponse(res, 400, null, `Form incomplete.`);
			sails.log.warn(`Form incomplete.`);
		}
	},
	create: (req, res) => {
		let body = req.body,
			toFind = {},
			toCreate = {};
		if (body.email && body.email !== '' && body.password && body.password !== '' && body.passwordConfirm && body.passwordConfirm !== '') {
			if (body.passwordConfirm === body.password) {
				toFind.email = body.email;
				User.findOneUser(toFind)
					.exec((err, finded) => {
						if (!err) {
							if (!finded) {
								toCreate.username = body.email;
								toCreate.email = body.email;
								toCreate.password = crypto.createHash('md5').update(body.password).digest('hex');
								toCreate.firstname = (body.firstname && body.firstname !== '') ? body.firstname : '';
								toCreate.lastname = (body.lastname && body.lastname !== '') ? body.lastname : '';

								User.addUser(toCreate)
									.exec((err, newUser) => {
										if (!err) {
											response.customResponse(res, 200, newUser, null);
											sails.log.info(`User ${newUser.id} created.`);
										} else {
											sails.log.error(new Error(`Ups, got an error :/ ${err}`));
										}
									});
							} else {
								response.customResponse(res, 400, null, `Email : ${finded.email} already exists.`);
								sails.log.warn(`Email : ${finded.email} already exists.`);
							}
						} else {
							sails.log.error(new Error(`Ups, got an error :/ ${err}`));
						}
					});
			} else {
				response.customResponse(res, 400, null, `Password not equal.`);
				sails.log.warn(`Password not equal.`);
			}
		} else {
			response.customResponse(res, 400, null, `Form incomplete.`);
			sails.log.warn(`Form incomplete.`);
		}
	}
};