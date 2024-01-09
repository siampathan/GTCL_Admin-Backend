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
        _id: req.params.id,
      },
    });
    res.json(response);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Internal Server Error" });
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
  const updatedData = {
    _menuid: req.body._menuid,
    _heading: req.body._heading,
    _sub_heading: req.body._sub_heading,
    _title: req.body._title,
    _sub_title: req.body._sub_title,
    _description: req.body._description,
    _button: req.body._button,
    _link: req.body._link,
    _serial: req.body._serial,
    _status: req.body._status,
  };

  try {
    const [rowsUpdated, [updatedItem]] = await Content.update(updatedData, {
      where: { _id: req.params.id },
    });

    if (rowsUpdated > 0) {
      res.status(200).json({ msg: "Item Updated Successfully", updatedItem });
    } else {
      res.status(404).json({ msg: "Item Not Found" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const deleteItems = async (req, res) => {
  try {
    const rowsDeleted = await Content.destroy({
      where: { _id: req.params.id },
    });

    if (rowsDeleted > 0) {
      res.status(200).json({ msg: "Product Deleted Successfully" });
    } else {
      res.status(404).json({ msg: "Product Not Found" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = {
  getItems,
  getItemsById,
  createItems,
  updateItems,
  deleteItems,
};
