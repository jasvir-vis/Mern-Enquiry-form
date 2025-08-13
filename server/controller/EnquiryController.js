const Data = require("../models/Data");

exports.insertData = (req, res) => {
    const { name, email, phone, message } = req.body;
    const data = new Data({
        name: name,
        email: email,
        phone: phone,
        message: message
    });
    data.save()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        });

}

exports.getData = (req, res) => {
    Data.find()
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.status(500).json({ message: err.message })
        });

}

exports.deleteData = (req, res) => {
    const id = req.params.id;
    Data.findByIdAndDelete(id)
        .then((data) => {
            res.json({ message: 'deleted successfully' }, data);
        })
        .catch((err) => {
            res.status(500).json({ message: err.message })
        });

}

exports.updateData = (req, res) => {
    const id = req.params.id;
    const { name, email, phone, message } = req.body;
    Data.findByIdAndUpdate(id, {
        name: name, email: email, phone: phone, message:
            message
    }, { new: true })
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.status(500).json({ message: err.message })
        });

}

exports.searchData = (req, res) => {

    const query = req.query.q;

    const condition = query
        ? { name: { $regex: query, $options: 'i' } }
        : {}; 

    Data.find(condition)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
}