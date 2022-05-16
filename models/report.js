const mongoose = require('mongoose');

const ReportSchema = mongoose.Schema({
    name: {
        type: 'String',
        required: true
    },
    reportedBy: {
        type: 'String',
        required: true
    },
    postId: {
        type: 'String',
        required: true
    }
})

module.exports =  ReportModel = mongoose.model('reportModel', ReportSchema);