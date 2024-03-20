import User from "../models/User";

export const getAllUsers = async (req, res) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    return console.log(err);
  }
  if (!users) {
    //   erro code 500 means internal server error
    return res.status(500).json({ message: "Unexpected Error Occured" });
  }
  return res.status(200).json({ users });
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
    return res.status(422).json({ message: "invalid Data" });
    // the 422 error code stands for unprecessible entity
  }

  let user;
  try {
    user = new User({ email, name, password });
    await user.save();
  } catch (err) {
    return console.log(err);
  }
  if (!user) {
    return res.status(500).json({ message: "Unexpected Error Occured" });
  }
  return res.status(201).json({ user });

  //code 201 stands for created
};
// import User from "../models/User";

// export const getAllUsers = async (req, res) => {
//   let users;
//   try {
//     users = await User.find();
//     return res.status(200).json({ users });
//   } catch (err) {
//     console.log(err);
//     return res
//       .status(500)
//       .json({ message: "Unexpected Error Occurred", error: err });
//   }
// };

// export const signup = async (req, res, next) => {
//   const { name, email, password } = req.body;
//   if (
//     !name ||
//     name.trim() === "" ||
//     !email ||
//     email.trim() === "" ||
//     !password ||
//     password.length < 6
//   ) {
//     return res.status(422).json({ message: "Invalid Data" });
//   }

//   let user;
//   try {
//     user = new User({ email, name, password });
//     await user.save();
//     return res.status(201).json({ user });
//   } catch (err) {
//     console.log(err);
//     return res
//       .status(500)
//       .json({ message: "Unexpected Error Occurred", error: err });
//   }
// };
