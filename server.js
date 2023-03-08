const express = require('express');
const cors = require('cors');

const moviesDB = require('./modules/projectsDB');
const db = new moviesDB();

const app = express();
const port = 3000;

require('dotenv').config();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'API listening'
        });
    }
);

app.get('/api/projects', (req, res) => {
    db.getAllProjects().then((projects) => {
        res.json(projects);
    }).catch((err) => {
        res.status(500).json(err);
    });
});

app.get('/api/projects/:id', (req, res) => {
    db.getMovieById(req.params.id).then((project) => {
        res.json(project);
    }).catch((err) => {
        res.status(500).json(err);
    });
});

db.initialize(process.env.MONGODB_CONN_STRING).then(() => {
    app.listen(port, () => {
        console.log(`API listening at http://localhost:${port}`);
    });
}
).catch((err) => {
    console.log(err)
});
