import { DataTypes, Model } from 'sequelize';

import sequelize from '../services/sequelize';
import Users from "./Users";


class Project extends Model {

}

Project.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    projectTitle:{
        type: DataTypes.STRING,
        allowNull: false,
    },


}, {
    sequelize,
    tableName: 'project',
    modelName: 'Project',
});
Project.belongsTo(Users, {
    foreignKey: 'UsersId',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

export default Project;
