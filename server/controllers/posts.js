import PostMessage from '../models/postMessage.js';
import mongoose from 'mongoose';



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
  const { id: _id } = req.params;
  const { title, message, creator, selectedFile, tags } = req.body;

  // _id is mongoose id

  if(!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).sent(`No post with that ${id}`)
    
  }

  const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

  await PostMessage.findByIdAndUpdate(id, updatedPost, {new: true})
  res.json(updatedPost)

}