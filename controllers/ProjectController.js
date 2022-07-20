import HttpErrors from 'http-errors';
import {Project, Users} from '../models';


class ProjectController {
    static create = async (req, res, next) => {
        try {
            const UsersId = req.userId
            console.log(UsersId)
            const {projectTitle} = req.body;
            // const exists = await Users.findOne({
            //     where: {projectTitle},
            //     attributes: ['id'],
            // });
            // if (exists) {
            //     throw HttpErrors(422, {
            //         errors: {
            //             error: ['Project already exists'],
            //         },
            //     });
            // }

            const project = await Project.create({
                projectTitle,
                UsersId
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
            const {
                projectTitle,id
            } = req.body.data;
            if (!projectTitle){
                throw HttpErrors(422)
            }
            const project1 = await Project.update({
                projectTitle
            }, {
                where: {
                    id,
                },
            });
            const project = await Project.findOne({
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
    static listProject = async (req, res, next) => {
        try {
            const { s = '' } = req.query;

            const where = {}

            if (s) {
                where.$or = [
                    { projectTitle: { $like: `%${s}%` } },
                ]
            }

            const project = await Project.findAll({
                where,
            });

            res.json({
                status: 'ok',
                project,
            });
        } catch (e) {
            next(e);
        }
    }

    static deleteProject = async (req, res, next) => {
        try {
            const {id} = req.params
            console.log(req)
            if (!id){
                throw HttpErrors(422)
            }
            await Project.destroy({
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

export default ProjectController;
