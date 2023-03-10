import User from "../models/user.model.js"
import Role from "../models/role.model.js"
import bcrypt from "bcrypt";
import { validationResult } from 'express-validator'
import jsonwebtoken from 'jsonwebtoken'
import { SECRETS } from "../config.js";

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jsonwebtoken.sign(payload, SECRETS.secret, {expiresIn: "24h"})
}

class AuthController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return res.status(400).json({ErrorMessage: `Registration failed`, errors: errors.errors.map(el => el.msg)})
            }
            const {username, password} = req.body
            const candidate = await User.findOne({username})
            if(candidate) {
                return res.status(400).json({message:`User with username '${username}' already exists`})
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: req.body.roles[0]})
            const user = new User({username, password: hashPassword, roles: [userRole.value]})
            await user.save()
            return res.json(`User '${username}' was successfully added`)
        } catch(e) {
            console.log(e)
            res.status(400).json({ErrorMessage: 'Registration error'})
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body
            const user = await User.findOne({username})
            if(!user) {
                return res.status(400).json({ErrorMessage: `User with username '${username}' wasn't found`})
            }
            const isValidPassword = bcrypt.compareSync(password, user.password)
            if(!isValidPassword) {
                return res.status(400).json({ErrorMessage: `Incorrect password for user '${username}' was provided`})
            }
            const token = generateAccessToken(user._id, user.roles)
            return res.json({token})
        } catch(e) {
            console.log(e)
            res.status(400).json({ErrorMessage: 'Login error'})
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users)
        } catch(e) {
            console.log(e)
            res.status(400).json({ErrorMessage: e})
        }
    }
}

export default new AuthController()