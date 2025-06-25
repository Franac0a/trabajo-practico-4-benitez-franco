import { Sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

const Character = Sequelize.define("character",{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
})

export default Character;
