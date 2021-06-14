export async function LoginAction(user){
    console.log("User From Login Action",user);
    let data = await fetch("http://192.168.1.117:3344/api/auth/register",{
        method:"POST",
        body:JSON.stringify(user)
    })
    loggedUser = await data.json();
    return {
        type:"loginOperation",
        payload:loggedUser
    }
}

export async function RegisterAction(newUser){
    console.log("User From Register Action",newUser);

    return {
        type:"registerOperation",
        payload:newUser
    }
}