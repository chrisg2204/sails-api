module.exports = {
	customResponse: (res, status, data, error) => {
		res.status(status).send({
			code: status,
			data: (data !== '') ? data : null,
			error: (error !== '') ? error : null
		});
	}
};