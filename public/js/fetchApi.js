/*It is a browser based api and fetch API provides an interface for fetching resource of a url passed to the client 
side javascrip or page it is not supported by noed and have nothing to do with server or node  */
/*What fetch do is it fetch resources of url to our client side javascript means when we paas adderss of our 
whether page it request that page for its resources and as we are changing that url with the help of js every time
we entered a city url got change as the serveris running on our machine the content got available for the fetch
and after fetching it got displayed the change in url is done at client side not server side adn that's why is
different frm request as in i got fetched to server. */

const search = document.querySelector('input')
const msg1 = document.getElementById('msg1')
const msg2 = document.getElementById('msg2')
const submit=document.getElementById("btn")
submit.addEventListener('click',(e)=>{
    msg1.textContent="loading..."
    msg2.textContent="" 
    const location=search.value
    e.preventDefault()
    fetch('/weather?address='+location).then((Response)=>{
      
        Response.json().then((data)=>{
            if(data.error){
                msg1.textContent=data.error
                msg2.textContent=""
            }
            else{
                msg1.textContent=data.location
                msg2.textContent=data.forecast
            }
        
    })
})

})
