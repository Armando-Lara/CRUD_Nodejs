const express=require('express');
const router=express.Router();
const conexion=require('./database/db')
const ejs = require('ejs');

router.get('/', (req, res)=>{

  
   
     conexion.query('SELECT*FROM users', (error, results)=>{
       
        if(error){
             throw error;
         }else{
            res.render('index', {results:results});
         }
    });
})

//Ruta para eliminar registros
router.get('/delete/:id', (req, res)=>{
    const id=req.params.id;
    conexion.query('DELETE FROM users WHERE id=?',[id],(error, results)=>{
        
        if(error){
            throw error;
        }else{
           res.redirect('/');
        }

    })

})

//Ruta para crear registros
router.get('/create',(req, res)=>{
    res.render('create');
})


//Ruta para editar registros.
router.get('/edit/:id', (req, res)=>{
    const id=req.params.id;
    conexion.query('SELECT*FROM users WHERE id=?',[id],(error, results)=>{
        
        if(error){
            throw error;
        }else{
           res.render('edit', {user:results[0]});
        }

    })

})



const crud=require('./controllers/crud');
 router.post('/save', crud.save);
 router.post('/update', crud.update);



module.exports=router;