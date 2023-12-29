const Social = require("../models/socialModel");
const path = require("path");
const fs = require("fs");

const getItems = async (req, res) => {
  try {
    const response = await Social.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

// const getItemsById = async (req, res) => {
//   try {
//     const response = await Social.findOne({
//       where: {
//         _id: req.params._id,
//       },
//     });
//     res.json(response);
//   } catch (error) {
//     console.log(error.message);
//   }
// };

const createItems = (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "No File Uploaded" });

  const name = req.body.title;
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];
  const link = req.body.link;

  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Invalid Images" });
  if (fileSize > 6000000)
    return res.status(422).json({ msg: "Image must be less than 5 MB" });

  file.mv(`./public/images/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await Social.create({
        _name: name,
        _image: fileName,
        _url: url,
        _link: link,
      });
      res.status(201).json({ msg: "Social Items Created Successfuly" });
    } catch (error) {
      console.log(error.message);
    }
  });
};

const updateItems = async (req, res) => {
  const product = await Social.findOne({
    where: {
      _id: req.params._id,
    },
  });
  if (!product) return res.status(404).json({ msg: "No Data Found" });

  let fileName = "";
  if (req.files === null) {
    fileName = product.image;
  } else {
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 6000000)
      return res.status(422).json({ msg: "Image must be less than 5 MB" });

    const filepath = `./public/images/${product.image}`;
    fs.unlinkSync(filepath);

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }
  const name = req.body.title;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

  try {
    await Social.update(
      { _name: name, _image: fileName, _url: url, _link: link },
      {
        where: {
          _id: req.params._id,
        },
      }
    );
    res.status(200).json({ msg: "Product Updated Successfuly" });
  } catch (error) {
    console.log(error.message);
  }
};

const deleteItems = async (req, res) => {
  const social = await Social.findOne({
    where: {
      _id: req.params._id,
    },
  });
  if (!social) return res.status(404).json({ msg: "No Data Found" });

  try {
    const filepath = `./public/images/${social._image}`;
    fs.unlinkSync(filepath);
    await Social.destroy({
      where: {
        _id: req.params._id,
      },
    });
    res.status(200).json({ msg: "Social Items Deleted Successfuly" });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getItems,
  createItems,
  updateItems,
  deleteItems,
};
