import { DataTypes, Model } from 'sequelize';

import sequelize from '../services/sequelize';
import Project from "./Project";


class Taskes extends Model {

}

Taskes.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    projectTask:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    status:{
        type: DataTypes.STRING,
        allowNull: false,
    },


}, {
    sequelize,
    tableName: 'taskes',
    modelName: 'Taskes',
});


Taskes.belongsTo(Project, {
    foreignKey: 'ProjectId',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

export default Taskes;
