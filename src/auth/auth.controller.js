import bcryptjs from 'bcryptjs';
import User from '../user/user.model.js';
import { generateJWT } from '../helpers/generate-jwt.js';

let exportedToken = '';

export const login = async (req, res) => {
   
    try {

        let user;

        const { email, password } = req.body;
        user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                msg: 'This email is not registered'
            });
        }

        if (!user.status) {
            return res.status(400).json({
                msg: 'This email is not registered'
            });
        }

        const validPassword = await User.findOne({ password })

        if (!validPassword) {
            return res.status(400).json({
                msg: 'Incorrect password'
            });
        }

        const token = await generateJWT(user.id);
        exportedToken = token;
        
        res.status(200).json({
            msg: `Successful login!! Your token is: ${token}`
        });

    } catch (e) {
        console.log('Contact an administrator')
        throw new Error(e);
    }
}

export { exportedToken };