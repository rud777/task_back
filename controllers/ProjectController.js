import HttpErrors from 'http-errors';
import {Project, Users} from '../models';
import validate from "../services/validate";


class ProjectController {
    static add = async (req, res, next) => {
        try {
            await validate(req.body, {
                type: 'required|string|in:New established,Continuous,Finished,Accepted,Denied',
            });
            const {title,task,type} = req.body;

            if (!title) {
                throw HttpErrors(422, {
                    errors: {
                        error: ['No Project'],
                    },
                });
            }

            const project = await Project.create({
                title,task,type
            });

            res.json({
                status: 'ok',
                project,
            });
        } catch (e) {
            next(e);
        }
    };
    static updateProject = async (req, res, next) => {
        try {
            await validate(req.body, {
                type: 'required|string|in:New established,Continuous,Finished,Accepted,Denied',
            });
            const {
                title,task,type,id
            } = req.body.data;
            const project1 = await Users.update({
                title,task,type
            }, {
                where: {
                    id,
                },
            });
            const project = await Users.findOne({
                where: {id},
            });
            res.json({
                status: 'ok',
                project,
                project1,
            });
        } catch (e) {
            next(e);
        }
    };

}

export default ProjectController;
