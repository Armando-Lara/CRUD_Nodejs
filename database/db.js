const mysql=require('mysql');
const conexion=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    port:'3308',
    database:'crud_nodejs_db'
})

conexion.connect((error)=>{
    if(error){
        console.error('Error de conexion es:'+error);
        return
    }
    console.log('¡Conexctado a la DB mysql!');
})

module.exports=conexion;