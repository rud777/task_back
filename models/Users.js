import { DataTypes, Model } from 'sequelize';
import md5 from 'md5';
import sequelize from '../services/sequelize';

const { PASSWORD_SECRET } = process.env;

class Users extends Model {
  static hash = (str) => md5(md5(str) + PASSWORD_SECRET);
}

Users.init({
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.ENUM('male', 'female', ''),
    allowNull: false,
  },
  age: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.CHAR(32),

    get() {
      return undefined;
    },
    set(val) {
      if (val) {
        this.setDataValue('password', Users.hash(val));
      }
    },
  },
  avatar: {
    type: DataTypes.STRING,
    get() {
      const avatar = this.getDataValue('avatar');
      const email = this.getDataValue('email');
      if (!avatar && email) {
        const hash = md5(email.toLowerCase());
        return `https://www.gravatar.com/avatar/${hash}?s=150&d=robohash`;
      }
    },
  },
  role:{
    type:DataTypes.ENUM('admin','worker'),
    defaultValue:'worker'
  }
}, {
  sequelize,
  tableName: 'users',
  modelName: 'Users',
});


export default Users;
