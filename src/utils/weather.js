const request=require('request')
const weather=(latitude,longitude,callback)=>{
    const url="https://api.darksky.net/forecast/86ce9d8c7b422a493a0fc10f1e2f359c/"+encodeURIComponent(latitude)+","+encodeURIComponent(longitude)+"?units=si"
    request({url:url,json:true},function(error,response){  
        if(error)
        {
            callback("unable to connect to weather service!",undefined)
           
        }
        else if(response.body.error)
        {
            callback("Unable to find the location!",undefined)
           
        }
        else
        {
            const data= response.body.daily.data[0].summary + "It is currently "+response.body.currently.temperature+" degree Celsius out."+"There is "+response.body.daily.data[0].precipProbability+"% percent chance of rain."
            callback(undefined,data)
            
        }
    })

}
module.exports=weather