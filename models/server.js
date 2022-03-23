const express = require('express');
const cors = require('cors');
const {dbConnection} = require('../database/config');

const API_ENDPOINT = '/api';
class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;
		this.endpointPrefixes = {
			'auth': `${API_ENDPOINT}/auth`,
			'categories': `${API_ENDPOINT}/categories`,
			'users': `${API_ENDPOINT}/users`,
		};

		// DB.
		this.createDBConnection();

		// Middlewares.
		this.middlewares();

		// Routes.
		this.routes();
	}

	async createDBConnection() {
		await dbConnection();
	}

	middlewares() {
		this.app.use(cors());
		this.app.use(express.json());
		this.app.use(express.static('public'));
	}

	routes() {
		this.app.use(this.endpointPrefixes.users, require('../routes/users'));
		this.app.use(this.endpointPrefixes.auth, require('../routes/auth'));
		this.app.use(this.endpointPrefixes.categories, require('../routes/categories'));

		// 404.
		this.app.use((request, response) => {
			response.status(404).json('Not Found');
		});
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log(`Listening on port ${this.port}`);
		});
	}
}

module.exports = Server;