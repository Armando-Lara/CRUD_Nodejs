const mysql=require('mysql');
const conexion=mysql.createConnection({
  
    user:'root',
    password:'',
    port:'3306',
    database:'crud_nodejs_db'
});

const mysq=require('mysql');
const connection=mysq.createConnection({
    user:'root',
    password:'',
    port:'3306',
    database:'crud_nodejs_db'
    
});

connection.connect((error)=>{
    if(error){
        console.error('Error de conexion es:'+error);
        return
    }
    console.log('¡Conectado a la DB login!');
})

conexion.connect((error)=>{
    if(error){
        console.error('Error de conexion es:'+error);
        return
    }
    console.log('¡Conectado a la DB mysql!');
})

module.exports=conexion, connection;

