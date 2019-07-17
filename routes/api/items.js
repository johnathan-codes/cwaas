const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
// Item Model
const Item = require('../../models/Item');

// @route   GET /api/items/:id
// @desc    Get a specific item
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    res.send({ item });
  } catch (err) {
    res.status(404).send({ message: 'Item not found!' });
  }
});

// @route   GET api/items
// @desc    Get All Items
// @access  Public
router.get('/', (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

// @route   POST api/items
// @desc    Create An Item
// @access  Private
router.post('/', auth, (req, res) => {
  const newItem = new Item({
    name: req.body.name,
    rating: req.body.rating,
    description: req.body.description,
    newEpisode: req.body.newEpisode
  });

  newItem.save().then(item => res.json(item));
});

// @route   DELETE api/items/:id
// @desc    Delete A Item
// @access  Private
router.delete('/:id', auth, (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

// @route   PUT /api/users/:id
// @desc    Update a user
// @access  Public
router.put('/:id', async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body);
    res.send({ message: 'The item was updated' });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

module.exports = router;
