const express = require('express');
const { insertData, getData, deleteData, updateData, searchData } = require('../controller/EnquiryController');
const app = express()
const router = express.Router();

router.post('/insert',insertData);
router.get('/', getData);
router.delete('/delete/:id', deleteData);
router.put('/update/:id', updateData);
router.get('/search', searchData);

module.exports = router;

