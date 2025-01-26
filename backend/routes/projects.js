const express = require('express');
const json = require('../helper/json');

const PROJECTS_PATH = 'data/projects.json';

const router = express.Router();

// get all projects
router.get('/', (req, res) => {
  json.read(PROJECTS_PATH, (err, data) => {
    if(err) {
      return res.status(500).json({error: 'invalid project data'});
    }

    res.json(data);
  });
});

// create new project
router.post('/', (req, res) => {
  const newProject = req.body;

  let checkError = checkProject(newProject)
  if(checkError) {
    return res.status(400).json({error: checkError});
  }

  json.read(PROJECTS_PATH, (err, data) => {
    if (err) {
      return res.status(500).json({error: err});
    }

    data.push(newProject);

    json.write(PROJECTS_PATH, data, (err) => {
      if (err) {
        return res.status(500).json({error: err});
      }
      res.json({});
    });
  });
});

// get project by id
router.get('/:slug', (req, res) => {
  const slug = req.params.slug;
  
  json.read(PROJECTS_PATH, (err, data) => {
    if(err) {
      return res.status(500).json({error: err});
    }

    let id = data.findIndex((item) => item.slug === slug);
    let project = data[id];
    res.json(project);
  })
});

router.put("/:slug", (req, res) => {
  const slug = req.params.slug;

  json.read(PROJECTS_PATH, (err, data) => {
    if(err) {
      return res.status(500).json({error: err});
    }

    let project = req.body;
    let checkError = checkProject(project)
    if(checkError) {
      return res.status(400).json({error: checkError});
    }

    let id = data.findIndex((item) => item.slug === slug);
    data[id] = project;

    json.write(PROJECTS_PATH, data, (err) => {
      if (err) {
        return res.status(500).json({error: err});
      }
    });

    res.json(data);
  })
});

router.delete("/:slug", (req, res) => {
  const slug = req.params.slug;

  json.read(PROJECTS_PATH, (err, data) => {
    if(err) {
      return res.status(500).json({error: err});
    }

    let id = data.findIndex((item) => item.slug === slug);
    data.splice(id, 1);

    json.write(PROJECTS_PATH, data, (err) => {
      if (err) {
        return res.status(500).json({error: err});
      }
    });

    res.json({});
  })
});


function checkProject(project) {
  if(!project.name) {
    return 'project name not found';
  }
  if(!project.slug) {
    return 'project slug not found';
  }
  return null
}

module.exports = router;
