import jsonwebtoken from 'jsonwebtoken'
import { SECRETS } from '../config.js'

export const roleMiddleware = (roles) => {
    return function(req, res, next) {
        if(req.method === 'options') {
            next()
        }
    
        try {
            const token = req.headers.authorization.split(' ')[1];
            if(!token) {
                return res.status(401).json({ErrorMessage: "Not authorized"});
            }
            const {roles: userRoles} = jsonwebtoken.verify(token, SECRETS.secret)
            let hashrole = false;
            userRoles.forEach(role => {
                if(roles.includes(role)) {
                    hashrole = true;
                }
            })
            if(!hashrole) {
                return res.status(403).json({ErrorMessage: "Access denied"});
            }
            next();
        } catch(e) {
            console.log(e);
            return res.status(403).json({ErrorMessage: "Not authorized"});
        }
    }
}