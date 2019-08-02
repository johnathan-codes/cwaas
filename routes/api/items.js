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
    .sort({ name: 1 })
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
    newEpisode: req.body.newEpisode,
    seenEpisodes: req.body.seenEpisodes
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

router.patch('/:id', auth, async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!item) {
      return res.status(404).send({ msg: 'Item not found' });
    }

    res.json(item);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('server error');
  }
});

module.exports = router;
