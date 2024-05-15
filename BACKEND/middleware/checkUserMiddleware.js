import User from '../models/userSchema.js'; 

const checkUserExistence = async (req, res, next) => {
  if (req.user) {
    try {
      const user = await User.findById(req.user._id);
      if (!user) {
        // If user does not exist, log them out
        return res.status(401).json({ message: "User no longer exists, please sign up again" });
      }
    } catch (error) {
      return next(error);
    }
  }
  next();
};

export default checkUserExistence;
