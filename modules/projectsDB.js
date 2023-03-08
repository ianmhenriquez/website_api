const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    title: String,
    description: String,
    image: String,
    shortDescription: String,
    link: String
}
);

module.exports = class ProjectsDB {
  constructor() {
    this.Project = null;
  }

  initialize(connectionString) {
    return new Promise((resolve, reject) => {
      const db = mongoose.createConnection(
        connectionString,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true
        }
      );

      db.once('error', (err) => {
        reject(err);
      });
      db.once('open', () => {
        console.log("connected to database ", connectionString);
        this.Project = db.model("projects", projectSchema);
        resolve();
      });
    });
  }

  getAllProjects() {
    return this.Project.find().exec();
  }

  getMovieById(id) {
    return this.Project.findById(id).exec();
  }
}