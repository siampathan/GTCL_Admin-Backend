const Content = require("../models/contentModel");

const getItems = async (req, res) => {
  try {
    const response = await Content.findAll();
    res.json(response);
  } catch (err) {
    console.error(err.message);
  }
};

const getItemsById = async (req, res) => {
  try {
    const response = await Content.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (err) {
    console.error(err.message);
  }
};

const createItems = async (req, res) => {
  const _menuid = req.body._menuid;
  const _heading = req.body._heading;
  const _sub_heading = req.body._sub_heading;
  const _title = req.body._title;
  const _sub_title = req.body._sub_title;
  const _description = req.body._description;
  const _button = req.body._button;
  const _link = req.body._link;
  const _serial = req.body._serial;
  const _status = req.body._status;

  try {
    await Content.create({
      _menuid,
      _heading,
      _sub_heading,
      _title,
      _sub_title,
      _description,
      _button,
      _link,
      _serial,
      _status,
    });
    res.status(201).json({ msg: "Product Created Successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const updateItems = async (req, res) => {
  const content = await Content.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!content) return res.status(404).json({ msg: "Data not Found" });
};

module.exports = {
  getItems,
  getItemsById,
  createItems,
};
