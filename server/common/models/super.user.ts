import { CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  literal,
} from 'sequelize';
import { User } from './user.js';


const superUserModel = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  company: {
    type: DataTypes.STRING(128),
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING(128),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING(128),
    allowNull: false,
    unique: true,
  },
  firstName: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
};

export class SuperUser extends Model<InferAttributes<SuperUser>,      
  InferCreationAttributes<SuperUser>> {
    declare id: CreationOptional<string>;
    declare company: string;
    declare email: string;
    declare password: string;
    declare username: string;
    declare firstName: string;
    declare lastName: string;
  }

export const superUserCrud = {
  initialize: (sequelize: any) => {
    SuperUser.init(superUserModel, { tableName: 'super_user', sequelize });
  },
  register: (superUser: any) => {
    return SuperUser.create(superUser);
  },
  findUser: (query: any) => {
    return SuperUser.findOne({ where: query, include: { model: User } });
  },
  updateUser: (query: any, updateValue: any) => {
    return SuperUser.update(updateValue, { where: query });
  },
  deleteUser: (query: any) => {
    return SuperUser.destroy({ where: query });
  },
};
