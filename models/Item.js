const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: '5'
  },
  description: {
    type: String
  },
  newEpisode: {
    type: String
  },
  seenEpisodes: {
    type: Number,
    default: '1'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Item = mongoose.model('item', ItemSchema);
