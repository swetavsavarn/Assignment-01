const express=require('express')
const app=express()
const bodyparser=require('body-parser')
const sequelize=require('./db')
const authorTable=require('./models/author')
const bookTable=require('./models/book')
app.use(bodyparser.json())
const cors=require('cors')
const book = require('./models/book')
app.use(cors())

app.post('/book',(req,res)=>{
   // console.log(req.body)
   const{id,name,isbn}=req.body
   bookTable.create({authorID:id,bookName:name,ISBN:isbn}).then(()=>res.json({"message":"saved"})).catch((err)=>{res.json(err)})
})

app.post('/author',(req,res)=>{
//console.log(req.body)
const name=req.body.name
authorTable.create({authorname:name}).then(()=>{res.json({"message":"saved"})}).catch((err)=>{res.json(err)})

})
app.get('/author',(req,res)=>{
   // const authorname=res.author.dataValues.authorname
   const obj={}
   obj['data']=[]
   
   authorTable.findAll().then((result)=>{
   
   for(var i=0;i<result.length;i++)
  {
   //console.log(result[i])
   obj['data'].push(result[i].dataValues.authorname)
  } 
 res.json(({"data":`${obj.data}`}))
  
  
  })
  

  
 
   })
   app.get('/book',(req,res)=>{
      
      // const authorname=res.author.dataValues.authorname
      const obj={}
      obj['data']=[]
      
      bookTable.findAll().then((result)=>{
      // console.log(result)
      
      for(var i=0;i<result.length;i++)
     {
      obj['data'].push(result[i].dataValues.bookName)
     } 
    res.json(({"data":`${obj.data}`}))
     
     
   })
     
   
     
    
      })
      app.get('/author/:name',(req,res)=>{
         const authorID=req.params.name
         var obj={}
         obj['data']=[]
         bookTable.findAll(({where:{authorID}})).then((result)=>{
            // res.json({"data":result})
            for(var i=0;i<result.length;i++)
            {
               obj['data'].push(result[i].dataValues.bookName)

            }
           res.json({"data":`${obj.data}`})
           
         })
        
      })


      app.get('/book/:isbn',(req,res)=>{
         const isbn=req.params.isbn
      //console.log(isbn)
         var obj={}
         obj['data']=[]
         bookTable.findAll(({where:{isbn}})).then((result)=>{
            // res.json({"data":result})
           const book=result[0].bookName
            for(var i=0;i<result.length;i++)
            {
               obj['data'].push(result[i].dataValues.bookName)

            }
            //console.log(book) 
            res.json({"data":`${obj.data}`})
             
         })
         
        
      })
      app.get('/book/:isbn',(req,res)=>{
         const isbn=req.params.isbn
         bookTable.destroy({where:{isbn}}).then(()=>{res.json({"message":"deleted"})})
         
      })

sequelize.sync().then((result) => { app.listen(3000) })
