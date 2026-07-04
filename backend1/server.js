const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({origin:"*"}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/",(req,res)=> {
    res.send("Backend is Running!");
});
app.listen(3000,()=> {
    console.log("Server is running on port 3000");
});

const db=require("./db");

app.get("/Regis",(req,res)=>{
    db.query("select * from Regis",(err,result)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            res.json(result);
        }
    });
});

app.post("/register", (req, res) => {

    const {
        first_name,
        last_name,
        email,
        mobile_number,
        date_of_birth,
        gender,
        password
    } = req.body;

    const sql = `INSERT INTO Regis
    (first_name, last_name, email, mobile_number, date_of_birth, gender, password)
    VALUES (?, ?, ?, ?, ?, ?, ?)`;

    db.query(
        sql,
        [
            first_name,
            last_name,
            email,
            mobile_number,
            date_of_birth,
            gender,
            password
        ],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ message: "Registration Failed!" });
            } else {
                res.json({ message: "Registration Successful!" });
            }
        }
    );
});

app.post("/login", (req, res) => {

    const { email, password } = req.body;

    const sql = "SELECT * FROM Regis WHERE email = ? AND password = ?";

    db.query(sql, [email, password], (err, result) => {

          if (err) {
            return res.json({ success: false, message: "Error" });
        }

        if (result.length > 0) {
            res.json({ success: true, message: "Login successful" });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});


// app.post("/qualification", (req, res) => {
//     try {
//         console.log("REQUEST BODY:", req.body);

//         const {
//             reg_id,
//             age,
//             qualification,
//             education_board,
//             stream_subject,
//             qualifying_year
//         } = req.body;

//         const sql = `
//             INSERT INTO Quali
//             (reg_id, age, qualification, education_board, stream_subject, qualifying_year)
//             VALUES (?, ?, ?, ?, ?, ?)
//         `;

//         db.query(sql,
//             [reg_id, age, qualification, education_board, stream_subject, qualifying_year],
//             (err, result) => {

//                 if (err) {
//                     console.log("MYSQL ERROR:", err);   // MUST show now
//                     return res.status(500).json({
//                         message: "DB error",
//                         error: err.sqlMessage
//                     });
//                 }

//                 res.json({ message: "Success" });
//             }
//         );

//     } catch (error) {
//         console.log("CATCH ERROR:", error);
//         res.status(500).json({ message: "Server crashed", error: error.message });
//     }
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
