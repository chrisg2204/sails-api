/**
 * Login.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

	attributes: {
		email: {
			type: 'string',
			contains: '@',
			unique: true,
			required: true,
		},
		password: {
			type: 'string',
			required: true
		}
	},
	addUser: (toCreate) => {
		Login.create(toCreate)
			.exec((err, newUser) => {
				if (err) {
					console.log(`Ups an error : ${err}`);
				} else {
					console.log(`Create user ${newUser}`);
				}
			});
	},
	findOneUserLogin: function(email, passwd) {
		console.log('hey');
	}
};