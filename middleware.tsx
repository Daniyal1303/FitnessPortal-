import { NextResponse } from "next/dist/server/web/spec-extension/response";

// import Cookies  from 'js-cookie';
import type { NextRequest } from 'next/server'


 function middleware(req:NextRequest) {


    
    // let loginToken = req.cookies.get("token");  
    // let Role = req.cookies.get("Role");  
    // console.log("Middleware Role",Role)
    // let url = req.url;
    // const baseUrl = "http://localhost:3000"
    // const adminRoutes  = [`${baseUrl}/dashboard`]

    let loginToken = req.cookies.get("token");  
    let Role = req.cookies.get("Role")?.value; 
    let userName = req.cookies.get("userName")?.value;   
    console.log("Middleware Role",Role)
    let url = req.url;
    const isAdmin =Role &&  Role == "SYS_ADMIN" ;
    const User =Role &&  Role == "ASSISTANT";


  
    if(loginToken && url === "http://localhost:3000/" && isAdmin) {
        return (NextResponse.redirect(`http://localhost:3000/trainee`))
    }
    else if(loginToken  && url  === "http://localhost:3000/" && User ){
        return NextResponse.redirect(`http://localhost:3000/payfees/${userName}`)
       }
       else if(loginToken  && url  === "http://localhost:3000/dashboard" && User ){
        return NextResponse.redirect(`http://localhost:3000/payfees/${userName}`)
       }
       else if(loginToken  && url  === "http://localhost:3000/trainer" && User ){
        return NextResponse.redirect(`http://localhost:3000/payfees/${userName}`)
       }
       else if(loginToken  && url  === "http://localhost:3000/trainee" && User ){
        return NextResponse.redirect(`http://localhost:3000/payfees/${userName}`)
       }
       else if(!loginToken && url === "http://localhost:3000/dashboard" ) {
        return NextResponse.redirect(`http://localhost:3000/`)
       }
       else if(!loginToken && url === "http://localhost:3000/trainer" ) {
        return NextResponse.redirect(`http://localhost:3000/`)
       }
       else if(!loginToken && url === "http://localhost:3000/trainee" ) {
        return NextResponse.redirect(`http://localhost:3000/`)
       }
       else if(!loginToken && url === `http://localhost:3000/payfees/${userName}` ) {
        return NextResponse.redirect(`http://localhost:3000/`)
       }

    //    else{
    //     return NextResponse.redirect(`http://localhost:3000/`)
    //    }


       
    
  
} 

export default middleware;