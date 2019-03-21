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

routes.post('', async (req, res) => {
	try {
		const user = db.insert(req.body);
		if (user) {
			res.status(201).json(user);
		} else {
			res.status(409).json({
				message: 'The user already exists!'
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Error at adding user!!'
		});
	}
});

routes.put('/:id', async (req, res) => {
	try {
		updated = await db.update(req.params.id, req.body);
		if (updated) {
			res.status(200).json({
				message: 'User was updated!'
			});
		} else {
			res.status(404).json({
				message: "The ID doesn' exist"
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Error at updating the user'
		});
	}
});

routes.delete('/:id', async (req, res) => {
	try {
		deleted = await db.remove(req.params.id);
		if (deleted) {
			res.status(200).json({
				message: 'User was deleted'
			});
		} else {
			res.status(404).json({
				message: "The ID doesn't exist"
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Error at deleting the user!'
		});
	}
});

routes.get('/:id/posts', async (req, res) => {
	try {
		posts = await db.getUserPosts(req.params.id);
		if (posts) {
			res.status(200).json(posts);
		} else {
			res.status(404).json({
				message: "The user doesn't have posts"
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Error at getting the users posts!'
		});
	}
});

module.exports = routes;
