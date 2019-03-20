const express = require('express');
const db = require('./data/helpers/userDb');

const routes = express.Router();

routes.get('', async (req, res) => {
	try {
		const users = await db.get();
		if (users) {
			res.status(200).json(users);
		} else {
			res.status(404).json({
				message: "User data doesn' exist"
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Error getting the users'
		});
	}
});

routes.get('/:id', async (req, res) => {
	try {
		user = await db.getById(req.params.id);
		if (user) {
			res.status(200).json(user);
		} else {
			res.status(404).json({
				message: "The ID doesn't exist!"
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Error at getting the user data!'
		});
	}
});

module.exports = routes;
