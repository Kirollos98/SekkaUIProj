export async function LoginAction(user){
    console.log("User From Login Action",user);
    let data = await fetch("http://192.168.1.7:3344/api/auth/login",{
        method:"POST",
        body:JSON.stringify(user),
        headers: { 'Content-Type': 'application/json' }
    })
    loggedUser = await data.json();
    return {
        type:"loginOperation",
        payload:loggedUser
    }
}

export async function RegisterAction(newUser){
    // console.log("User From Register Action",newUser);
    // let data=await fetch("http://192.168.1.7:8888/api/Course",{
    //     method:"GET",
    // })
    // let x=await data.json();
   // let data = await fetch("http://192.168.1.7:3344/api/auth/register",{
        let data = await fetch("http://172.20.10.2:3344/api/auth/register",{

        method:"POST",
        body:JSON.stringify(newUser),
        headers: { 'Content-Type': 'application/json' }
    })
    console.log("hellooooo")
    let x=await data.json();
    console.log(x)
    return {
        type:"registerOperation",
        payload:newUser
    }
}