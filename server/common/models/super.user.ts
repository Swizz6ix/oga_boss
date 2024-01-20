import { Association, CreationOptional,
  DataTypes,
  HasManyCountAssociationsMixin,
  HasManyGetAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from 'sequelize';
import { User } from './user.js';
import { configs } from '../../config.js';
import { Department } from './department.js';
import { Task } from './task.js';


const superUserModel = {
  superuserId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
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
  role: {
    type: DataTypes.STRING(128),
    defaultValue: configs.roles.ADMIN,
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
    declare superuserId: CreationOptional<string>;
    declare company: string;
    declare email: string;
    declare password: string;
    declare username: string;
    declare role?: string;
    declare firstName: string;
    declare lastName: string;
    declare getUsers: HasManyGetAssociationsMixin<User>;
    declare getDepartments: HasManyGetAssociationsMixin<Department>;
    declare getTasks: HasManyGetAssociationsMixin<Task>;
    declare countUsers: HasManyCountAssociationsMixin;
    declare countDepartments: HasManyCountAssociationsMixin;
    declare countTasks: HasManyCountAssociationsMixin;
    declare Users?: NonAttribute<User[]>;
    declare Departments?: NonAttribute<Department[]>;
    declare Tasks?: NonAttribute<Task[]>;
    declare static associations: {
      Users: Association<SuperUser, User>;
      Departments: Association<SuperUser, Department>;
      Tasks: Association<SuperUser, Task>;
    };
  }

export const superUserCrud = {
  initialize: (sequelize: any) => {
    SuperUser.init(superUserModel, { tableName: 'super_user', sequelize });
  },
  register: (superUser: any) => {
    return SuperUser.create(superUser);
  },
  findUser: (query: any) => {
    return SuperUser.findOne({ where: query, 
      include: { model: User } 
    });
  },
  updateUser: (query: any, updateValue: any) => {
    return SuperUser.update(updateValue, { where: query });
  },
  deleteUser: (query: any) => {
    return SuperUser.destroy({ where: query });
  },
};
