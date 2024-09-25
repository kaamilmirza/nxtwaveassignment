import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';
import User from './User';

interface TodoAttributes {
  id: string;
  task: string;
  status: string;
  userId: string;
}

class Todo extends Model<TodoAttributes> implements TodoAttributes {
  public id!: string;
  public task!: string;
  public status!: string;
  public userId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Todo.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    task: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'in progress', 'done', 'completed'),
      defaultValue: 'pending',
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'todos',
  }
);

// Define relationships
Todo.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Todo, { foreignKey: 'userId' });

export default Todo;
