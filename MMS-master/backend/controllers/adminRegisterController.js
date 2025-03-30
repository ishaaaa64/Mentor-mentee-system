import { Admin } from "../models/adminRegisterSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";

export const adminRegister= async (req, res, next) => {
  console.log(req.body);
  const { email, name, phno, password } = req.body;

  try {
      if (!email || !name || !phno || !password  ) {
        //console.log("Missing fields:", { email, name, phno, password });
        return res.status(400).json({ success: false, message: "Please fill the forms" });
  }

    // Check if the admin already exists in the database
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ success: false, message: "Admin already exists" });
    }

  await Admin.create({ email, name, phno, password });

  res.status(200).json({
    success: true,
    message: "Admin Created!",
  });
  } catch (err) {
    next(err);
  }
};


