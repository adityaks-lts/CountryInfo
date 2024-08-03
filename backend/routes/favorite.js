const { Router } = require("express");
const User = require("../modal/userSchema");
const favorites = Router();

favorites.get("/", async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user.favorites);
  } catch (err) {
    res.status(500).send(err);
  }
});

favorites.post("/", async (req, res) => {
  try {
    console.log(req.body.favorites)
    await User.findByIdAndUpdate(req.user.id, {
      $push: { favorites: req.body.favorites },
    });
    res.json({ message: "Success" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

favorites.delete("/:cc", async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const updatedFav = user.favorites.filter(elem => {
      if(elem == req.params.cc) return false;
      else return true;
    })
    await User.findByIdAndUpdate(req.user.id, {
      favorites:updatedFav,
    });
    res.json({ message: "Success" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = favorites;
