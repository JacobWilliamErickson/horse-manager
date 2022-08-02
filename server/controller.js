require("dotenv").config();
const horses = require("./db.json");
const { CONNECTION_STRING } = process.env;
const Sequelize = require("sequelize");
let horseId = 3;
const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});
module.exports = {
  getHorses: (req, res) => {
    sequelize
      .query(`select * from horse_table`)
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log(err));
  }, 
  createHorse: (req, res) => {
    const {name,barnname,owner,age,imageURL} = req.body;
    let newhorse = {
      horse_id: horseId,
      name: name,
      barnname,owner,age,
      imageURL
    };
    console.log(newhorse)
    horses.push(newhorse);
    res.status(200).send(horses);
    horseId++
  },
  updateHorse: (req, res) => {
    res.status(200).send(horses);
  }, 
  seed: (req, res) => {
    sequelize
      .query(`
      drop table if exists horse_table;

      create table horse_table (
        horse_id serial primary key,
        name varchar,
        barnname varchar,
        owner varchar,
        age varchar,
        imageURL varchar
        );

      insert into horse_table (name,barnname,owner,age,imageURL) values ('Midnight Sun','Sunny','Roger','10','./horse4.jpg'),('SunKnight Mid','Middy','Roger','19','./horse2.jpg');
      `)
      .then(() => {
        console.log("DB seeded!");
        res.sendStatus(200);
      })
      .catch((err) => console.log("error seeding DB", err));
    }
}