import Post from "../models/Post";

export const getAllPosts = async (req, res) => {
  let posts;
  try {
    posts = await Post.find();
  } catch (err) {
    return console.log(err);
  }
  if (!posts) {
    return res.status(500).json({ message: "Unexpected Error Occured" });
  }
  return res.status(200).json({ posts });
};
export const addPost = async (req, res) => {
  const { title, description, location, date, image, user } = req.body;

  if (
    !title &&
    title.trim() === "" &&
    !description &&
    description.trim() === "" &&
    !location &&
    location.trim() === "" &&
    !date &&
    !user &&
    !image &&
    image.trim() === ""
  ) {
    return res.status(422).json({ message: "Invalid Data" });
  }
  let post;
  let newPost;
  try {
    newPost = new Post({
      title,
      description,
      image,
      location,
      date: new Date(`${date}`),
      user,
    });
    post = await newPost.save();
  } catch (err) {
    return console.log(err);
  }

  if (!post) {
    return res.status(500).json({ message: "Unexpected Error Occurred" });
  }
  return res.status(201).json({ post });
};
export const getPostById = async (req, res) => {
  const id = req.params.id;

  let post;
  try {
    post = await Post.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!post) {
    return res.status(404).json({ message: "NO Post Found" });
  }
  return res.status(200).json({ post });
};
export const updatePost = async (req, res) => {
  const id = req.params.id;
  const { title, description, location, date, image } = req.body;

  if (
    !title &&
    title.trim() === "" &&
    !description &&
    description.trim() === "" &&
    !location &&
    location.trim() === "" &&
    !date &&
    !image &&
    image.trim() === ""
  ) {
    return res.status(422).json({ message: "Invalid Data" });
  }
  let post;
  try {
    post = await Post.findByIdAndUpdate(id, {
      title,
      description,
      image,
      location,
      date: new Date(`${date}`),
    });
  } catch (err) {
    return console.log(err);
  }
  if (!post) {
    return res.status(500).json({ message: "Unable to update" });
  }
  return res.status(200).json({ message: "Updated Successfully" });
};
