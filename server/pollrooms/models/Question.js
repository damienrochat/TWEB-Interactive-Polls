var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Answer = require('./Answer');

var QuestionSchema = Schema({
    title: { type: String, required: true },
    status: { type: String, enum: ['pending', 'open', 'closed'], default: 'open', required: true },
    creator: { type: String, required: true },
    created_at: { type: Date, default: Date.now, required: true },

    answers: [Answer.schema]
});

QuestionSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        return {
            id: ret._id,
            title: ret.title,
            status: ret.status,
            nb_positives_votes: 0,
            nb_negatives_votes: 0,
            nb_participants: 0,
            answers: ret.answers,
            creator: ret.creator,
            created_at: ret.created_at
        };
    }
});

module.exports = mongoose.model('Question', QuestionSchema);
