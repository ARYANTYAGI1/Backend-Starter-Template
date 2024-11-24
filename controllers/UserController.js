const User = require('../models/User');
const CommonHelper = require('../helpers/Common');
const bcrypt = require('bcryptjs');
const { registerValidationSchema } = require('../validations/userValidation');


module.exports = {
  register: async (req, res) => {
    const { error } = registerValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { name, email, password } = req.body;
    try {
      const checkUser = await User.findOne({email:email});
      if(checkUser) return res.status(400).send({ success:false, message: 'User Already Exsits', data: null });
      const user = new User({
        name: name,
        email: email,
        password: password
      })
      await user.save();
      return res.status(200).send({
        success: true,
        message: "User Created Successfully",
        data: user._id
      });
    } catch (error) {
      res.status(500).send({ success:false, message: 'Internal Server Error', data: error.message });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = CommonHelper.generateToken(user)
        res.send({ success: true, message: 'Login Success', data: { user: user._id, token: token}});
      } else {
        res.status(400).json({ success: false, message: 'Invalid credentials', data: null });
      }
    } catch (error) {
      console.log(error)
      res.status(500).send({ success:false, message: 'Internal Server Error', data: error.message });
    }
  },
};
