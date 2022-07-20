import HttpErrors from 'http-errors';
import {Project, Taskes, Users} from '../models';
import validate from "../services/validate";


class TaskesController {
    static create = async (req, res, next) => {
        try {
            await validate(req.body, {
                status: 'required|string|in:New established,Continuous,Finished,Accepted,Denied',
            });
            const {projectTask,status} = req.body;
            

            const project = await Project.create({
                projectTask,status
            });

            res.json({
                status: 'ok',
                project,
            });
        } catch (e) {
            next(e);
        }
    };
    static updateTaskes = async (req, res, next) => {
        try {
            await validate(req.body, {
                status: 'required|string|in:New established,Continuous,Finished,Accepted,Denied',
            });
            const {
                projectTask,status,id
            } = req.body.data;
            const project1 = await Users.update({
                projectTask,status
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
    static deleteTaskes = async (req, res, next) => {
        try {
            const {id} = req.params
            if (!id){
                throw HttpErrors(422)
            }
            await Taskes.destroy({
                where: {
                    id
                },
            })
            res.json({
                status: 'deleted',
            })
        } catch (e) {
            next(e)
        }
    }


}

export default TaskesController;
