import { DataTypes, Model } from 'sequelize';

import sequelize from '../services/sequelize';


class Project extends Model {

}

Project.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    task:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    type:{
        type: DataTypes.STRING,
        allowNull: false,
    },


}, {
    sequelize,
    tableName: 'project',
    modelName: 'Project',
});

export default Project;
