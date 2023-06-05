import express from "express";
import userRoutes from "./routes/users.js"
import cors from "cors";
import {db} from "./db.js"
import jwt  from "jsonwebtoken";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", userRoutes);

function generateAuthToken(userId) {
    const secretKey = 'sua_chave_secreta';
  
    const payload = {
      userId: userId
    };
  
    const token = jwt.sign(payload, secretKey, { expiresIn: '2h' });
  
    return token;
  }


app.post("/login",(req, res) =>{
    const user = req.body.user;
    const password = req.body.senha;
    db.query("SELECT * from usuarios where user = ? and senha = ?",[user,password], (err, result) =>{
        if(err){
            res.send(err)
            console.log(err)
        }
        if(result.length > 0){
            const userId = result[0].user;
            const authToken = generateAuthToken(userId);
            res.send({token: authToken});
            
        } else{
            res.send({msg:"Usuário e/ou senha não cadastrados!"})
        }
    })
});

app.post("/resume_amb", (req, res)=>{
    let sensor = req.body.sensor_p;
    db.query("SELECT * FROM tb_temp_humi WHERE id_sensor LIKE ? order by id desc limit 60 ",[sensor], (err, result) =>{
        if (err) console.log(err);
        else res.send(result);
    })
});

app.get("/sensores", (req, res)=>{
    let SQL = "SELECT * from sensores";
    db.query(SQL, (err, result) =>{
        if (err) console.log(err);
        else res.send(result);
    })
});

app.post("/cad_sensores", (req, res)=>{
   let sensor = req.body.id_sensor
   let name = req.body.name
   let loc = req.body.loc
   let max = req.body.max
   let min = req.body.min
   let responsavel = req.body.responsavel
    db.query("INSERT INTO sensores(key_sensor, name_sensor, loc_sensor, max, min, responsavel) values (?,?,?,?,?,?)", [sensor,name,loc,max,min,responsavel] , (err, result) =>{
        if (err) console.log(err);
        else res.send({msg:"Sensor cadastrado com sucesso!"});
    })
});

app.post("/del_sensores", (req, res)=>{
    let sensor = req.body.sensor;
     db.query("DELETE FROM sensores where key_sensor = ?", [sensor] , (err, result) =>{
         if (err) console.log(err);
         else res.send({msg:"Sensor deletado com sucesso!"});
     })
 });


 app.post("/cal_sensores", (req,res) =>{
    let sensor = req.body.sensor;
    let loss_temp = req.body.loss_temp;
    let loss_humi = req.body.loss_humi;
    let responsavel = req.body.responsavel;
    console.log(sensor,loss_humi,loss_temp)
    db.query("UPDATE sensores set loss_temp = ?, loss_humi = ?,responsavel = ?  where key_sensor = ?",
     [loss_temp, loss_humi, responsavel, sensor,], (err, result) => {
        if (err) console.log(err)
        else res.send({msg:"Valores registrados. Reiniciar sensor para atualização!"})
     } )
 }) 

app.post("/card",(req, res) =>{
    const card = req.body.card
    db.query("SELECT * FROM tb_temp_humi WHERE id_sensor LIKE ? order by id desc limit 1", [card],(err, result) =>{
        if(err) console.log(err);
        else res.send(result)
        console.log(card)
        console.log(result);
    })
});

app.post("/search",(req, res) =>{
    let sensor = req.body.sensor;
    let data  = req.body.data
    db.query("SELECT * from tb_temp_humi where id_sensor = ? and DATE(date_time) = ?", [sensor,data],(err, result) =>{
        if(err) console.log(err);
        else res.send(result)
    })
});

app.listen(3001, () => {
    console.log("Tudo certo!")
});