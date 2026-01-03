const Sclass = require('../models/sclassSchema');

// CREATE CLASS
const sclassCreate = async (req, res) => {
    try {
        const sclass = new Sclass({
            ...req.body,
            school: req.user.id
        });

        const result = await sclass.save();
        res.status(201).json(result);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET CLASS LIST
const sclassList = async (req, res) => {
    try {
        const sclasses = await Sclass.find({ school: req.user.id });
        res.json(sclasses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { sclassCreate, sclassList };
