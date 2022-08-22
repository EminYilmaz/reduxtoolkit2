const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "personels",
});

app.get("/getpersonels", (req, res) => {
  const getQuery = "select * from personel where id>90 ";
  db.query(getQuery, (err, result) => {
    res.send(result);
  });
});

app.post("/create", (req, res) => {
  const name = req.body.name;
  const surname = req.body.surname;

  const insertDb = "insert into personel (name,surname) values (?,?)";
  db.query(insertDb, [name, surname], (err, result) => {
    console.log(result);
    res.send(result);
  });
});

app.put("/updatepersonels/:id", (req, res) => {
  const id = req.params.id;
  const name = req.body.name;

  const updateDb = "UPDATE personels.personel SET name=? where id=?";
  db.query(updateDb, [name, id], (err, result) => {
    res.send(result);
  });
});

// app.put("/update/:id", (req, res) => {
//   const id = req.params.id;
//   const name = req.body.name;
//   const surname = req.body.surname;
//   const dept = req.body.dept;

//   let upPer = "UPDATE personels.personel SET";
//   let add = "where id=?";
//   let value = 0;

//   if (name !== "") {
//     //İsim boş değilse
//     upPer = upPer.concat(" ", "name=?");
//     value = value + 1; // sadece name
//     if (surname !== "") {
//       // soyad boş değilse
//       upPer = upPer.concat(" ,", "surname=?");
//       value = 2; // name ve surname

//       if (dept !== "") {
//         //Bölüm boş değilse
//         upPer = upPer.concat(" ,", "dept=?");
//         value = 3; // name surname dept
//       }
//     } else {
//       if (dept !== "") {
//         //Bölüm boş değilse
//         upPer = upPer.concat(" ,", "dept=?");
//         value = 4; // name  dept
//       }
//     }
//   } else {
//     if (surname !== "") {
//       upPer = upPer.concat(" ", "surname=?");

//       value = 5; // sadece surname
//       if (dept !== "") {
//         upPer = upPer.concat(" ,", "dept=?");
//         value = 6; // surname dept
//       }
//     } else {
//       if (dept !== "") {
//         upPer = upPer.concat(" ", "dept=?");
//         value = 7; // sadece dept
//       }
//     }
//   }

//   upPer = upPer.concat(" ", add);

//   switch (value) {
//     case 1:
//       db.query(upPer, [name, id], (err, res) => {
//         console.log(err);
//       });
//       break;
//     case 2:
//       db.query(upPer, [name, surname, id], (err, res) => {
//         console.log(err);
//       });
//       break;

//     case 3:
//       db.query(upPer, [name, surname, dept, id], (err, res) => {
//         console.log(err);
//       });
//       break;
//     case 4:
//       db.query(upPer, [name, dept, id], (err, res) => {
//         console.log(err);
//       });
//       break;
//     case 5:
//       db.query(upPer, [surname, id], (err, res) => {
//         console.log(err);
//       });
//       break;
//     case 6:
//       db.query(upPer, [surname, dept, id], (err, res) => {
//         console.log(err);
//       });
//       break;
//     case 7:
//       db.query(upPer, [dept, id], (err, res) => {
//         console.log(err);
//       });
//       break;
//   }
// });

app.listen(3001, () => {
  console.log("Bağlantı Sağlandı");
});
