require("dotenv").config();
const { CONNECTION_STRING } = process.env;
const Sequelize = require("sequelize");
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
      .query(`select * from horse_table;`)
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log(err));
  },
  moveHorse: (req, res) => {
    const { stall, id } = req.body;
    sequelize
      .query(
        `update horse_table set position = ${stall} where horse_id = ${id}`
      )
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log(err));
  },
  createHorse: (req, res) => {
    const { name, barnname, owner, age, imageURL } = req.body;
    sequelize
      .query(
        `
    insert into horse_table (name,barnname,owner,age,imageURL,position) values ('${name}','${barnname}','${owner}','${age}','${imageURL}','0')`
      )
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log(err));
  },
  updateHorse: (req, res) => {
    res.status(200).send(horses);
  },
  seed: (req, res) => {
    sequelize
      .query(
        `
      drop table if exists horse_table;

      create table horse_table (
        horse_id serial primary key,
        name varchar,
        barnname varchar,
        owner varchar,
        age varchar,
        imageURL varchar,
        position integer
        );

      insert into horse_table (name,barnname,owner,age,imageURL,position) values ('Midnight Sun','Sunny','Roger','10','horse4.jpg',0),('SunKnight Mid','Middy','Roger','19','horse2.jpg',1);
      `
      )
      .then(() => {
        console.log("DB seeded!");
        res.sendStatus(200);
      })
      .catch((err) => console.log("error seeding DB", err));
  },

  changeSearchValues: (req, res) => {
    const {searchcat,searchtext}=req.body
    console.log(searchcat)
    console.log(searchtext)
    sequelize
       .query(`select * from horse_table where ${searchcat} = '${searchtext}';`)
       .then((dbRes) => console.log(dbRes[0]))
       .catch((err) => console.log(err));
  },
};
