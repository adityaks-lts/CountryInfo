const { Router } = require("express");
const User = require("../modal/userSchema");
const searches = Router();

searches.get("/", async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user.searches);
  } catch (err) {
    res.status(500).send(err);
  }
});

searches.post("/", async (req, res) => {
  try {
    console.log(req.body.search);
    
    await User.findByIdAndUpdate(req.user.id, {$push: {searches: req.body.search}});
    res.json({message:"Success"});
  } catch (err) {
    res.status(500).json({message:err});
  }
});

searches.delete("/:cc", async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const updatedSea = user.searches.filter(elem => {
      if(elem == req.params.cc) return false;
      else return true;
    })
    await User.findByIdAndUpdate(req.user.id, {
      searches:updatedSea,
    });
    res.json({ message: "Success" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = searches;
