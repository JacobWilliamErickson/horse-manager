require("dotenv").config();
const { DATABASE_URL } = process.env;
const Sequelize = require("sequelize");
const sequelize = new Sequelize(DATABASE_URL, {
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

  getJournals: (req, res) => {
      console.log( req.query.searchcat)
      if(req.query.searchcat===undefined){

        sequelize
          .query(`select * from horse_table
          join journal_table on horse_table.horse_id = journal_table.horse_id
          ORDER BY date desc;`)
          .then((dbRes) => res.status(200).send(dbRes[0]))
          .catch((err) => console.log(err));
      }
      else{
        const { searchcat, searchtext } = req.query;
        sequelize
          .query(
            `select * from horse_table
            join journal_table on horse_table.horse_id = journal_table.horse_id
            where ${searchcat} like '%${searchtext}%'
            ORDER BY date desc`
          )
          .then((dbRes) => res.status(200).send(dbRes[0]))
          .catch((err) => console.log(err));

      }
    
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
    insert into horse_table (name,barnname,owner,age,imageURL,position) values ('${name}','${barnname}','${owner}','${age}','${imageURL}','0');`
      )
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log(err));
  },

  submitentry: (req, res) => {
    const { horse,title,date,type,summary} = req.body;
    sequelize
      .query(
        `
        insert into journal_table(horse_id,title,date,type,summary) values  ('${horse}','${title}','${date}','${type}','${summary})`
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
        drop table if exists journal_table;
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
        create table journal_table (
          horse_id int REFERENCES horse_table(horse_id),
          title varchar, 
          date date,
          type varchar,
          summary varchar(5000),
          journal_id serial primary key
          );

      insert into horse_table (name,barnname,owner,age,imageURL,position) values ('Midnight Sun','Sunny','Roger','10','horse4.jpg',0),
      ('SunKnight Mid','Middy','Roger','19','horse2.jpg',1),
      ('High Brow Cat','Brow','Jacob','35','https://chtolive.com/wp-content/uploads/2019/12/IMG_5067.jpg',0),
      ('Smart Little Lena ','Lena','Steven','17','https://weatherfordequine.com/wp-content/uploads/2020/12/S-20150307144449_02.jpg',0),
      ('Alaska','ally','Jacob','4','https://thumbs.dreamstime.com/b/portrait-gray-arabian-horse-head-light-background-profile-pictures-97890060.jpg',0),
      ('Metallic Cat','Cat','Rex','25','https://stallionregisterdirectory.com/wp-content/uploads/2020/12/SRMMG_200800_00220-880x880.jpg',0),
      ('Boon too Suen','Boon','Suzanne','16','https://www.6666ranch.com/wp-content/uploads/stallions/BoonTooSuen11-scaled.jpg',0),
      ('Dual Rey','Rey','Linda','7','https://stallionregisterdirectory.com/wp-content/uploads/2020/12/SRMMG_200800_00174-880x880.jpg',0),
      ('Rockin W','Rockin','Brock','4','https://equine-services.de/attachments/Image/Rocking-W_1.jpg?template=generic',0),
      ('Doc Quixote','Doc','Juan','2','https://upload.wikimedia.org/wikipedia/commons/9/91/Doc_Quixote.jpg',0),
      ('Two Eyed Jack','Jack','Suzanne','8','https://aqhadigital.panoramac.com/AMH/AMHRV/2019_03/pgs_0/F-0004/graphics/TwoeyedJack002.jpg',0),
      ('Hickory Holly Time','Holly','Brock','7','https://www.perfecthorseauctions.com/user_images/2017/7634346.jpg',0),
      ('Lightning','Palo','Juan','7','https://www.deephollowranch.com/wp-content/uploads/2021/06/What-Exactly-Is-a-Palomino-Horse.jpg',0),
      ('Apache','Patches','Linda','19','https://www.tophorse.com.au/images/ResizedImages/31-12-12-138511Image2_w577h600.jpg',0);


      insert into journal_table(horse_id,title,date,type,summary) values 
      (8,'Deworming','2019-08-01T08:30'
      ,'health','Routine Deworming visit, fly-spray also applied'),
      (8,'Farrier Visit','2022-06-01T08:30'
      ,'health','The thicker shoes are doing well, just a trim today.'),
      (8,'Farrier Visit','2022-04-20T08:30'
      ,'health','The farrier came and got his feet looking good again, requested we put on thicker shoes so we are trying it out'),
      (5,'B.S.E','2022-06-01T08:30'
      ,'health','Alaska is still healthy to breed, we discussed different studs and timing most likely August and Dual Rey'),
      (3,'Wound Fix','2022-06-01T08:30'
      ,'health','High Brow kicked a fence and cut just above his right hind leg, no muscles cut just flesh, just one stich and wrapped up. Still sound to ride and train. We need to rewrap weekly'),


      (4,'Flag Day / Snaffle','2021-08-15T08:30'
      ,'training','Our training session today was pretty great. We are transitioning from a snaffle to correction bit which she is taking well, She is still very cowey and plan to work her on a few cows tomorrow'),
      (8,'Cow Day','2022-06-17T08:30'
      ,'training','Rey had the best work of the cows, he is loose through the shoulders which is big improvement'),
      (6,'Cow Day','2022-06-17T08:30'
      ,'training','The cows were tired when we got to Metallic which made for a difficult work, Cows again tommorow'),
      (7,'Flag Day','2021-08-15T08:30'
      ,'training','Routine flag for Boon, needs help staying in on the flag, but will send and stop with ease'),
      (8,'Cow / Bison','2022-01-07T08:30'
      ,'training','Dual Rey continues to stand as a contender for the top, His aggression against the bison was impressive. Work at the show with nose-chain'),
      (1,'Flag Day','2021-08-15T08:30'
      ,'training','Midnight had a routine flag day, no further comments'),
      (2,'Cow / Bison Day','2022-01-07T08:30'
      ,'training','Sunnys first day training with the Bison, It was pretty timid which is unusual from the cows but will need some more bison time'),
      (10,'Ground Work','2022-08-05T08:30'
      ,'training','He is ramping up to start in the saddle, He is loungeing well and is desensitized to the saddle blanket and tarp. Lets shoot for saddle loungeing on monday! '),


      (4,'Purchase','2008-06-01T08:30'
      ,'other','One of the best mares on market, Purchased for 450,000 and has earned 270,000'),
      (2,'Show Results','2022-06-01T08:30'
      ,'other','Sunny outperformed expectations at the texas show, won the open and the open rider 25000 in earning and a cool buckle'),
      (10,'Purchase','2022-02-01T08:30'
      ,'other','Long shot out of Metallic Cat and a Mare with the name of CR TUFF strong and undervalued. Purchased'),
      (8,'Purchase','2018-06-01T08:30'
      ,'other','He has earned 110,000 already with lots of life and a good stud fee. Purchased for 600,000');
      `
      )
      .then(() => {
        console.log("DB seeded!");
        res.sendStatus(200);
      })
      .catch((err) => console.log("error seeding DB", err));
  },

  searchHorses: (req, res) => {
    const { searchcat, searchtext } = req.query;
    sequelize
      .query(
        `select * from horse_table where ${searchcat} like '%${searchtext}%';`
      )
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log(err));
  },
};
