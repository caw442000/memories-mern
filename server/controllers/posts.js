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
  const { id: _id } = req.params;
  // const { title, message, creator, selectedFile, tags } = req.body;

  const post = req.body;

  console.log("requ", req.body)

  // _id is mongoose id

  if(!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).sent(`No post with that id`)
    // return res.status(404).sent(`No post with that ${id}`)
    
  }

  // const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

  const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, {new: true})
  res.json(updatedPost)

}