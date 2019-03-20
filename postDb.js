const express = require('express');
const db = require('./data/helpers/postDb');

const routes = express.Router();

routes.use(express.json());

routes.get('', async (req, res) => {
	try {
		const posts = await db.get();
		if (posts) {
			res.status(200).json(posts);
		} else {
			res.status(404).json({ message: 'Data could not be found' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Error retrieving the data'
		});
	}
});

routes.get('/:id', async (req, res) => {
	try {
		const post = await db.getById(req.params.id);
		if (post) {
			res.status(200).json(post);
		} else {
			res.status(404).json({ message: "The ID doesn't exist!" });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Error receiving data'
		});
	}
});

routes.post('', async (req, res) => {
	try {
		const post = await db.insert(req.body);
		if (post) {
			res.status(200).json(post);
		} else {
			res.status(409).json({
				message: 'The Data already exists in the database!'
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Error adding data to the database!'
		});
	}
});

routes.put('/:id', async (req, res) => {
	try {
		updated = await db.update(req.params.id, req.body);
		if (updated) {
			res.status(200).json({ message: 'The user was successfully updated!!' });
		} else {
			res.status(404).json({ message: "The ID doesn't exist" });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error updating the post!' });
	}
});

routes.delete('/:id', async (req, res) => {
	try {
		const deleted = await db.remove(req.params.id);
		if (deleted) {
			res.status(200).json({ message: 'Post successfully deleted!!' });
		} else {
			res.status(404).json({ message: "The ID doesn't exist" });
		}
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: 'Error at deleting the Post!!' });
	}
});

module.exports = routes;
