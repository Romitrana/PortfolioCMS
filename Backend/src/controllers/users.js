const User = require("../model/User");
const jwt = require("jsonwebtoken");

const testURL = (req, res) => {
  res.send("testing url from user hit");
};

const login = (req, res) => {};
const logout = (req, res) => {};

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if any user already exists
    const existingUser = await User.findOne({});
    if (existingUser) {
      return res
        .status(403)
        .json({ message: "Registration not allowed. Admin already exists." });
    }

    // Create new admin user
    const user = await User.create({ name, email, password, role: "admin" });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "Admin user created",
      token,
      user: { name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  testURL,
  login,
  logout,
  register,
};
