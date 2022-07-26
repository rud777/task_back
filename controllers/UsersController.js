import HttpErrors from 'http-errors';
import JWT from 'jsonwebtoken';
import validate from '../services/validate';
import  {Users} from '../models';
import {sendEmail} from "../services/mailRequest";

const {JWT_SECRET} = process.env;

class UsersController {
    static register = async (req, res, next) => {
        try {
            await validate(req.body, {
                firstName: 'required|string|min:3',
                lastName: 'required|string|min:3',
                age: 'required|string|min:2',
                gender: 'required|string',
                email: 'required|email',
                phoneNumber: 'required|phone',
                password: 'required|string|min:6',
            });

            const {firstName, lastName, age, gender, email, phoneNumber, password,} = req.body;
            const exists = await Users.findOne({
                where: {email},
                attributes: ['id'],
            });

            if (exists) {
                throw HttpErrors(422, {
                    errors: {
                        error: ['email already exists'],
                    },
                });
            }
            sendEmail(email,password);

            const user = await Users.create({
                firstName, lastName, age, gender, email, phoneNumber, password,
            });

            res.json({
                status: 'ok',
                message: 'you have successfully registered',
                user,
            });
        } catch (e) {
            next(e);
        }
    };
    static login = async (req, res, next) => {
        try {
            validate(req.body, {
                email: 'required|email',
                password: 'required|string',
            });
            const {email, password} = req.body;
            const user = await Users.findOne({
                where: {email},
            });
            if (!user || user.getDataValue('password') !== Users.hash(password)) {
                throw HttpErrors(403, 'wrong password or email');
            }
            const token = JWT.sign({userId: user.id}, JWT_SECRET);
            res.json({
                status: 'ok',
                token,
                user,
            });
        } catch (e) {
            next(e);
        }
    };
}

export default UsersController;
