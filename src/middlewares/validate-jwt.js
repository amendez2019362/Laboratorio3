import jwt from 'jsonwebtoken';
import User from '../user/user.model.js';
import { exportedToken } from '../auth/auth.controller.js';

export const validateJWT = async (req, res, next) => {
    try {

        const token = exportedToken

        if (!token) {
            return res.status(401).json({
                msg: 'The Token was not generated. You have to log in to get one.'
            });
        }

        const { uid } = jwt.verify(token, process.env.SECRETPRIVATEKEY);
        const user = await User.findById(uid);

        if (!user) {
            return res.status(401).json({
                msg: 'Does not exist'
            });
        }

        if (!user.status) {
            return res.status(401).json({
                msg: 'The token is not valid. This user is in status: false'
            });
        }

        req.user = user;
        next();

    } catch (e) {
        console.log('')
        res.status(401).json({
            msg: 'Invalid token'
        })
        console.log("Token is:", exportedToken, "\n")
        console.log(e)
    };
}       