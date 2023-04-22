const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user.js");

async function signup(req, res) {
  const { email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  await User.create({ email, password: hashedPassword });
  res.sendStatus(200);
}

async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.sendStatus(401);

  const passwordMatch = bcrypt.compareSync(password, user.password);
  if (!passwordMatch) return res.sendStatus(401);

  const exp = Date.now() + 1000 * 60 * 60 * 24 * 30; // 30 days
  const token = jwt.sign({ sub: user._id, exp }, process.env.SECRET_KEY);

  // Set the cookie
  res.cookie("Authorization", token, {
    expires: new Date(exp),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  res.sendStatus(200);
}

function logout(req, res) {
  try {
    res.cookie("Authorization", "", { expires: new Date() });
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

function checkAuth(req, res) {
  try {
    res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(400);
  }
}

module.exports = {
  signup,
  login,
  logout,
  checkAuth,
};
