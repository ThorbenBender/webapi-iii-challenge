const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const PostRoutes = require('./postDb');
const UsersRoutes = require('./userDb');

const server = express();

server.use(express.json());

server.use(cors());

server.use(helmet());

server.use('/posts', PostRoutes);

server.use('/users', UsersRoutes);

module.exports = server;
