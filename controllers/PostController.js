import PostService from "../services/PostService.js"

class PostController {
    async create(req, res) {
        try {
            const post = await PostService.create(req.body, req.files.picture)
            res.status(200).json(post)
        } catch (e) {
            res.status(500).json({ErrorMessage: e.message})
        }
    }

    async getAll(req, res) {
        try {
            const posts = await PostService.getAll()
            return res.json(posts)
        } catch(e) {
            res.status(500).json({ErrorMessage: e.message})
        }
    }

    async getPost(req,res) {
        try {
            const post = await PostService.getPost(req.params.id)
            return res.json(post)
        } catch(e) {
            res.status(500).json({ErrorMessage: e.message})
        }
    }

    async update(req,res) {
        try {
            const updatedPost = await PostService.update(req.body)
            return res.json(updatedPost)
        } catch(e) {
            res.status(500).json({'ErrorMessage': e.message})
        }
    }
    
    async delete(req,res) {
        try {
            const post = await PostService.delete(req.params.id)
            return res.json(post)
        } catch(e) {
            res.status(500).json({ErrorMessage: e.message})
        }
    }
}

export default new PostController()