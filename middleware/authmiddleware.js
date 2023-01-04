import jsonwebtoken from 'jsonwebtoken'
import { SECRETS } from '../config.js'

export function authmiddleware(req, res, next) {
    if(req.method === 'options') {
        next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        if(!token) {
            return res.status(401).json({ErrorMessage: "Not authorized"});
        }
        const decodedData = jsonwebtoken.verify(token, SECRETS.secret);
        req.user = decodedData;
        next();
    } catch(e) {
        console.log(e);
        return res.status(401).json({ErrorMessage: "Not authorized"});
    }
}