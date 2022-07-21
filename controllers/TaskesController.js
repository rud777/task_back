import HttpErrors from 'http-errors';
import {Project, Taskes, Users} from '../models';
import validate from "../services/validate";


class TaskesController {
    static create = async (req, res, next) => {
        try {
            const {projectTask,status,ProjectId} = req.body;


            const project = await Taskes.create({
                projectTask,status,ProjectId
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
            const {
                status,id
            } = req.body.data;
            const taskes1 = await Taskes.update({
               status
            }, {
                where: {
                    id,
                },
            });
            const taskes = await Taskes.findOne({
                where: {id},
            });
            res.json({
                status: 'ok',
                taskes,
                taskes1,
            });
        } catch (e) {
            next(e);
        }
    };

    static listTaskes = async (req, res, next) => {
        try {
            const {ProjectId}=req.query

            const taskes = await Taskes.findAll({
                where: {
                    ProjectId,
                }
            });

            res.json({
                status: 'ok',
                taskes,
            });
        } catch (e) {
            next(e);
        }
    }
}

export default TaskesController;
