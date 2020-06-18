'user strict';
var sql = require('./db.js');

//Task object constructor
var Client = function(client){
    this.client = client.name;
    this.address = client.address;
};
Client.createTask = function (newTask, result) {    
        sql.query("INSERT INTO client set ?", newTask, function (err, res) {
                
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    console.log(res.insertId);
                    result(null, res.insertId);
                }
            });           
};
// Client.getTaskById = function (taskId, result) {
//         sql.query("Select task from client where id = ? ", taskId, function (err, res) {             
//                 if(err) {
//                     console.log("error: ", err);
//                     result(err, null);
//                 }
//                 else{
//                     result(null, res);
              
//                 }
//             });   
// };
// Client.getAllTask = function (result) {
//         sql.query("Select * from client", function (err, res) {

//                 if(err) {
//                     console.log("error: ", err);
//                     result(null, err);
//                 }
//                 else{
//                   console.log('client : ', res);  

//                  result(null, res);
//                 }
//             });   
// };
// Client.updateById = function(id, task, result){
//   sql.query("UPDATE client SET task = ? WHERE id = ?", [task.task, id], function (err, res) {
//           if(err) {
//               console.log("error: ", err);
//                 result(null, err);
//              }
//            else{   
//              result(null, res);
//                 }
//             }); 
// };
// Client.remove = function(id, result){
//      sql.query("DELETE FROM client WHERE id = ?", [id], function (err, res) {

//                 if(err) {
//                     console.log("error: ", err);
//                     result(null, err);
//                 }
//                 else{
               
//                  result(null, res);
//                 }
//             }); 
// };

module.exports= Task