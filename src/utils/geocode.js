const request = require("request");
const geocode=(address,callback)=>{
    const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?proximity=-74.70850,40.78375&access_token=pk.eyJ1Ijoia2t1bmFsZ3VwdGFhYSIsImEiOiJjazYzb2NwMDkwNTY3M2pwOWlyMTYwZmtlIn0.ngdiS2HpzpLCx_RIRQd1JA"
    request({url:url,json:true},function(err,res){
        if(err)
        {
            callback("unable to connect to location service!",undefined)
        }
        else if(res.body.features.length==0)
        {
            callback("Unable to find the location!...try another search.",undefined)   
        }
        else
        {
            const data={
                latitude:res.body.features[0].center[1],
                longitude:res.body.features[0].center[0],
                location:res.body.features[0].place_name
            }
            callback(undefined,data)
            
        }   
    })
    }
    module.exports=geocode