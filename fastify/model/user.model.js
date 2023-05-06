const { Model, DataTypes } = require("sequelize");
import { sequelize } from "../config/sequelize..js";

export const User = sequelize.define("User", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  firstName: { type: DataTypes.STRING },
  lastName: { type: DataTypes.STRING },
  userName: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  active: { type: DataTypes.BOOLEAN, defaultValue: false },
  birthday: { type: DataTypes.DATE, allowNull: true },
  accessToken: { type: DataTypes.STRING, defaultValue: "" },
});

export const UserDetail = sequelize.define("UserDetail", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  address: { type: DataTypes.STRING },
  latitude: { type: DataTypes.DOUBLE },
  longitude: { type: DataTypes.DOUBLE },
  userId: { type: DataTypes.INTEGER },
});

User.hasOne(UserDetail);
UserDetail.belongsTo(User);

// table ro besaz
User.sync({ alert: true }).then(() => {
  console.log("User Sync completed");
});
UserDetail.sync({ alert: true }).then(() => {
  console.log("UserDetail Sync completed");
});
