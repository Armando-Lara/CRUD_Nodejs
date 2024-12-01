const express= require('express');
const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express(express.json));

//Establecemos el motor de platillas.
app.set("view engine", "ejs");

//Invocamos a bcryptja.
const bcryptjs=require('bcryptjs');

//Variable de session.
const session=require('express-session');
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}));

//Invocamos el modulo de conexxion a la base de datos
const connection= require('./database/db');

app.use('/', require('./router'));

//Invocamos a dotenv
const dotenv=require('dotenv');
dotenv.config({path:"./env/.env"});

//estableciendo rutas.
app.get("/", (req, res)=>{
    res.render('index', {msg:'Esto es un menjaje desde node'})
})

//Autenticacion
app.post('/auth', async(req, res)=>{
    const user=req.body.user;
    const pass=req.body.pass;
    let passwordHaash=await bcryptjs.hash(pass, 8);
    if(user && pass){
        connection.query('SELECT * FROM users WHERE user=?', [user], async(error, results)=>{
            if(results.length == 0 || !(await bcryptjs.compare(pass, results[0].pass))){
                res.render('login',{
                    alert: true,
                    alertTitle:"Error",
                    alertMessage:"Usuario o password incorrectos",
                    alerticon:"error",
                    showConfirmButton:true,
                    timer:false,
                    ruta:"login"
                });
            }else{
                req.session.loggedin=true;
                req.session.name=results[0].name
                res.render('login',{
                    alert: true,
                    alertTitle:"Conexion exitosa",
                    alertMessage:"¡Login correcto!",
                    alerticon:"success",
                    showConfirmButton:false,
                    timer:1500,
                    ruta:""
                });

            }
        })
    }else{
        res.render('login',{
            alert: true,
            alertTitle:"Advertencia",
            alertMessage:"¡Favor de ingresar usuario y password!",
            alerticon:"warning",
            showConfirmButton:true,
            timer:1500,
            ruta:"login"
        });
    }
})

//Auth
app.get('/',(req, res)=>{
    if(req.session.loggedin){
        res.render('index',{
            login:true,
            name:req.session.name
        });
    }else{
        res.render('index',{
            login:false,
            name:'Debe iniciar sesion'

        })
    }
})

app.get("/login", (req, res)=>{
    res.render('login')
})

app.get("/register", (req, res)=>{
    res.render('register')
})

//Registracion
app.post('/register',async(req, res)=>{
    const user=req.body.user;
    const name=req.body.name;
    const rol=req.body.rol;
    const pass=req.body.pass;
    let passwordHaash=await bcryptjs.hash(pass,8);
    connection.query('INSERT INTO users SET ?', {user:user, name:name, rol:rol, pass:passwordHaash}, async(error, results)=>{
        if(error){
            console.log(error);
        }else{
            res.render('register',{
                alert: true,
                alertTitle:"Registration",
                alertMessage:"¡Successful Registration!",
                alerticon:"succes",
                showConfirmButton:false,
                time:false,
                ruta:""
            })
    }
})
})


//Directorio public
app.use("/resourses", express.static('public'))
app.use("/resourses", express.static(__dirname + '/public'));

console.log(__dirname)

app.listen(5000, (req, res)=>{
    console.log('SERVER corriendo http://localhost:5000');

});

