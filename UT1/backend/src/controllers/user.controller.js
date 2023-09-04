const database= require('../config/database');
const mysql2 = require("mysql2");


const readUser = (req,res) => {
    const {id} = req.params;
    const readquery = `SELECT * FROM user WHERE id=?; `;
    const query = mysql2.format(readquery,[id]);
    database.query(query,(err,result) => {
        if(err) throw err;
        if (result[0]!== undefined){
            res.json(result[0]);
        }else{
            res.json({message: "User not found"});
        }
    });
    
};

const createUser = (req,res) => {
    const {first_name, last_name,age} = req.body;
    const createQuery = `INSERT INTO user(first_name, last_name,age) VALUE(?,?,?)`;
    const query = mysql2.format(createQuery, [first_name,last_name,age]);
    database.query(query,(err,result) => {
        if(err) throw err;
        console.log(result);
        res.send({message: "User created"});
    })
};

const updateUser = (req,res) => {
    const {id} = req.params;
    const {first_name, age} = req.body;

    const updateQuery = `UPDATE user SET first_name=?, age=? WHERE id=?`;
    const query = mysql2.format(updateQuery,[first_name,age,id]);
    database.query(query,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.json({message: "User updated"});
    })
}
const deleteUser = (req,res) => {
    const {id} = req.params;
    const deleteQuery = `DELETE FROM user WHERE id=?`;
    const query= mysql2.format(deleteQuery, [id]);

    database.query(query,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.json({message: "User deleted"});
    })
}

module.exports = {
    createUser,
    readUser,
    updateUser,
    deleteUser,
};