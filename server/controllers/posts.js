import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';



export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();

    console.log(postMessages)
    res.status(200).json(postMessages)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}
export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostMessage(post);

  try {
    await newPost.save()
    res.status(201).json(newPost)

  } catch (error) {
    res.status(409).json({ message: error.message })
  }

}

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, message, creator, selectedFile, tags } = req.body;

  // const post = req.body;

  console.log("requ", req.body)

  // _id is mongoose id

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).sent(`No post with that id`)
    // return res.status(404).sent(`No post with that ${id}`)
    
  }

  const updatedPost = { creator, title, message, tags, selectedFile, _id: id };


  try {

    await PostMessage.findByIdAndUpdate(id, updatedPost, {new: true})

  } catch (error) {

    console.log(error)
  }
  res.json(updatedPost)

}

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
  try {

    await PostMessage.findByIdAndRemove(id);

  } catch(error) {
    console.log(error)
  }

  res.json({ message: "Post deleted successfully." });
}