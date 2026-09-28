const fs = require('fs');
const path = require('path');

const models = ['Member', 'Announcement', 'Project', 'Event', 'Resource', 'GalleryItem'];

models.forEach(model => {
  const lowerModel = model.toLowerCase();
  
  const controllerContent = `const ${model} = require('../models/${model}');

exports.getAll = async (req, res) => {
  try {
    const items = await ${model}.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const item = await ${model}.findById(req.params.id);
    if (!item) return res.status(404).json({ message: '${model} not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const newItem = new ${model}(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updatedItem = await ${model}.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) return res.status(404).json({ message: '${model} not found' });
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const deletedItem = await ${model}.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: '${model} not found' });
    res.json({ message: '${model} deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
`;

  fs.mkdirSync(path.join(__dirname, 'src', 'controllers'), { recursive: true });
  fs.writeFileSync(path.join(__dirname, 'src', 'controllers', lowerModel + 'Controller.js'), controllerContent);

  const routeContent = `const express = require('express');
const router = express.Router();
const controller = require('../controllers/' + '${lowerModel}Controller');
const { protect } = require('../middleware/authMiddleware');

router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.post('/', protect, controller.create);
router.put('/:id', protect, controller.update);
router.delete('/:id', protect, controller.delete);

module.exports = router;
`;

  fs.mkdirSync(path.join(__dirname, 'src', 'routes'), { recursive: true });
  fs.writeFileSync(path.join(__dirname, 'src', 'routes', lowerModel + 'Routes.js'), routeContent);
});

console.log('Controllers and routes generated.');
