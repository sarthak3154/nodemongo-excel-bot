const express = require('express')
const mongoXlsx = require('mongo-xlsx')
const router = express.Router();
const User = require('../models/user')

router.get('/getUserData', (req, res) => {
    User.find({}, (err, users) => {
        if(err) return res.statusCode(204).send('Something went wrong')

        var model = mongoXlsx.buildDynamicModel(users)
        mongoXlsx.mongoData2Xlsx(users, model, (error, data) => {
            if(error) return res.send('Failed to Generate a XLS File')
            console.log('File saved at: ', data.fullPath)
            return res.send('File saved at: '+ data.fullPath)
        })
    })
})

module.exports = router