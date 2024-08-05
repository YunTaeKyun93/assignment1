const express = require("express");
const router = express.Router();
const Item = require("../models/todo");

router.post("/", async (req, res) => {
  const { content } = req.body;
  let item = new Item({
    content,
    isChecked: false,
  });

  try {
    item = await item.save();
    res.status(201).send(item);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.send(items);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).send("todo 없대영");
    }
    res.send(item);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) {
      return res.status(404).send("존재하지않는데영");
    }
    res.send(item);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).send("존재하지않는데영");
    }
    res.send(item);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
