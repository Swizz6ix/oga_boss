import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";

// The user's schema
const userModel = {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING(128),
    allowNull: false,
    unique: true,
  },
  userName: {
    type: DataTypes.STRING(128),
    allowNull: false,
    unique: true,
  },
  department: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  hod: {
    type: DataTypes.STRING(128),
    allowNull: true,
  },
  role: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING(128),
    allowNull: false,
  }
}

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>>
{
  declare id: CreationOptional<number>;
  declare email: string;
  declare userName: string;
  declare department: string;
  declare hod: string | null;
  declare role: string;
  declare firstName: string;
  declare lastName: string;
}

export const userCrud = {
  initialize: (sequelize: any) => {
    User.init(userModel, { tableName: 'users', sequelize });
  },
  createUser: (user: any) => {
    return User.create(user);
  },

  findUser: (query: any) => {
    return User.findOne({ where: query });
  },

  findAllUsers: (query: any) => {
    return User.findAll({ where: query });
  },

  updateUser: (query: any, updateValue: any) => {
    return User.update(updateValue, { where: query });
  },

  deleteUser: (query: any) => {
    return User.destroy({ where: query })
  }
}
