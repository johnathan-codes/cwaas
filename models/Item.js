const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  rating: {
    type: String,
    default: '5'
  },
  description: {
    type: String
  },
  newEpisode: {
    type: String
  },
  seenEpisodes: {
    type: String,
    default: '1'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Item = mongoose.model('item', ItemSchema);
