// import { compareSync, hashSync } from "bcryptjs";
// import User from "../models/User";

// export const getAllUsers = async (req, res) => {
//   let users;
//   try {
//     users = await User.find();
//   } catch (err) {
//     return console.log(err);
//   }
//   if (!users) {
//     //   erro code 500 means internal server error
//     return res.status(500).json({ message: "Unexpected Error Occured" });
//   }
//   return res.status(200).json({ users });
// };

// export const getUserById = async (req, res) => {
//   const id = req.params.id;

//   let user;
//   try {
//     user = await User.findById(id).populate("posts");
//   } catch (err) {
//     return console.log(err);
//   }
//   if (!user) {
//     return res.status(404).json({ message: "No user found" });
//   }

//   return res.status(200).json({ user });
// };

// export const signup = async (req, res, next) => {
//   const { name, email, password } = req.body;
//   if (
//     !name &&
//     name.trim() === "" &&
//     !email &&
//     email.trim() === "" &&
//     !password &&
//     password.length < 6
//   ) {
//     return res.status(422).json({ message: "invalid Data" });
//     // the 422 error code stands for unprecessible entity
//   }
//   const hashedPassword = hashSync(password);
//   let user;
//   try {
//     user = new User({ email, name, password: hashedPassword });
//     await user.save();
//   } catch (err) {
//     return console.log(err);
//   }
//   if (!user) {
//     return res.status(500).json({ message: "Unexpected Error Occured" });
//   }
//   return res.status(201).json({ user });

//   //code 201 stands for created
// };

// export const login = async (req, res, next) => {
//   const { email, password } = req.body;
//   if (!email && email.trim() === "" && !password && password.length < 6) {
//     // if (!email || email.trim() === "" || !password || password.length < 6) {
//     return res.status(422).json({ message: "invalid Data" });
//     // the 422 error code stands for unprocessible entity
//   }
//   let existingUser;
//   try {
//     existingUser = await User.findOne({ email });
//   } catch (err) {
//     return console.log(err);
//   }
//   if (!existingUser) {
//     return res.status(404).json({ message: "No User Found" });
//   }
//   const isPasswordCorrect = compareSync(password, existingUser.password);
//   if (!isPasswordCorrect) {
//     return res.status(404).json({ message: "Incorrect Password" });
//   }
//   return res
//     .status(200)
//     .json({ id: existingUser._id, message: "Login Successfull" });
// };

// // import User from "../models/User";

// // export const getAllUsers = async (req, res) => {
// //   let users;
// //   try {
// //     users = await User.find();
// //     return res.status(200).json({ users });
// //   } catch (err) {
// //     console.log(err);
// //     return res
// //       .status(500)
// //       .json({ message: "Unexpected Error Occurred", error: err });
// //   }
// // };

// // export const signup = async (req, res, next) => {
// //   const { name, email, password } = req.body;
// //   if (
// //     !name ||
// //     name.trim() === "" ||
// //     !email ||
// //     email.trim() === "" ||
// //     !password ||
// //     password.length < 6
// //   ) {
// //     return res.status(422).json({ message: "Invalid Data" });
// //   }

// //   let user;
// //   try {
// //     user = new User({ email, name, password });
// //     await user.save();
// //     return res.status(201).json({ user });
// //   } catch (err) {
// //     console.log(err);
// //     return res
// //       .status(500)
// //       .json({ message: "Unexpected Error Occurred", error: err });
// //   }
// // };

import { compareSync, hashSync } from "bcryptjs";
import User from "../models/User";

export const getAllUsers = async (req, res) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    return console.log(err);
  }

  if (!users) {
    return res.status(500).json({ message: "Unexpected Error Occured" });
  }

  return res.status(200).json({ users });
};

export const getUserById = async (req, res) => {
  const id = req.params.id;

  let user;
  try {
    user = await User.findById(id).populate("posts");
  } catch (err) {
    return console.log(err);
  }
  if (!user) {
    return res.status(404).json({ message: "No user found" });
  }

  return res.status(200).json({ user });
};

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (
    !name &&
    name.trim() === "" &&
    !email &&
    email.trim() === "" &&
    !password &&
    password.length < 6
  ) {
    return res.status(422).json({ message: "Inavalid Data" });
  }

  const hashedPassword = hashSync(password);

  let user;
  try {
    user = new User({ email, name, password: hashedPassword });
    await user.save();
  } catch (err) {
    return console.log(err);
  }

  if (!user) {
    return res.status(500).json({ message: "Unexpected Error Occured" });
  }

  return res.status(201).json({ user });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && email.trim() === "" && !password && password.length < 6) {
    return res.status(422).json({ message: "Inavalid Data" });
  }

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res.status(404).json({ message: "No user found" });
  }
  const isPasswordCorrect = compareSync(password, existingUser.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password" });
  }

  return res
    .status(200)
    .json({ id: existingUser._id, message: "Login Successfull" });
};
