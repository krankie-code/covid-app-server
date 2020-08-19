const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    score: {type: Number},
    userId:{type: Schema.Types.ObjectId,ref:'User'}
},
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
      },
})

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;