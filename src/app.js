const path=require('path')  //this is a node core module so we do not have any need to install it
const express=require('express') 
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast= require('./utils/weather')
const app=express() 
const port=process.env.PORT || 3000  
//define path for express config          
const publicDirectoryPath=path.join(__dirname,'../public')  /*defing path of public directory so that public
                                                            directory can be served up!*/
const viewsPath=path.join(__dirname,'../templates/views') /*seting up the path of templates as ii can't  recognised
                                                         as default  name like views*/
const partialsPath=path.join(__dirname,'../templates/partials')
//setup handlebars engine and views loacation in express
app.set('view engine','hbs')   
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))        
app.get('',(req,res)=>{       
    res.render('index',{                //rendering the index.hbs
        title:'Weather app',            // dynamic content to index.hbs
        name:'Kunal Gupta'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Kunal Gupta'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        help:'how can i help you!',
        name:'Kunal Gupta'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){                       /*req.query will contain the query passed in url and req.query.key
                                                   will provide the value of the key passed in url*/
        res.send({error:'you must provide an address!'});
    }
    else{
        geocode(req.query.address,(error,{latitude,longitude,location}={})=>{//used default parameter and destructer
            if(error){
                res.send({error})
            }
            else{
                forecast(latitude,longitude,(error,forecastData)=>{
                    if(error){ 
                        res.send({error})
                         
                    }
                    else{
                        res.send({
                            location:location,
                            forecast:forecastData,
                        })
                     
                    }   
                })
            }

        })
    }
  
})
app.get('/help/*',(req,res)=>{  //if we want article or preceding page not exist the we can do this e.g. /help/data not exist
    res.send('<h1>help article not found</h1>')
 })
app.get('*',(req,res)=>{    // matches to everythng not matched,* matches to everything and all matches are done
   res.render('404',{
       name:'Kunal Gupta'
   })
})
app.listen(port,(err)=>{                  
    if(err){        
        console.log("something went wrong")
    }
    else
    {
        console.log("yup, my server is running on port:"+port)
    }

})