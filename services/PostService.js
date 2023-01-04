import Post from "../models/Post.js"
import FileService from "./FileService.js"

class PostService {
    async create(post, picture) {
        const filename  = FileService.saveFile(picture)
            const createdPost = await Post.create({...post, picture: filename})
            return createdPost
        }
    

    async getAll() {
            const posts = await Post.find()
            return posts

    }

    async getPost(id) {
        if(!id) {
            throw new Error('Id was not provided')
        }
        const post = await Post.findById(id)
        return post;
    }

    async update(post) {
            if(!post._id) {
                throw new Error( 'Id was not provided') 
            }
            const updatedPost = await Post.findByIdAndUpdate(post._id, post, {new: true})
            return updatedPost

    }
    
    async delete(id) {
        if(!id) {
            throw new Error('Id was not provided')
        }
            const post = await Post.findByIdAndDelete(id)
            return post
    }
}

export default new PostService()