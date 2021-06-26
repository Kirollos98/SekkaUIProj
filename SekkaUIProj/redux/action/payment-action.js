const Base = 'http://192.168.1.12:3344/api/payment/';

export async function Payment(amount){
    // console.log("amount el haydf3 gowwwwwwwwwwwaaaaaaaaaa");

    let intent;

    // console.log("amount el haydf3",amount);

    let data = await fetch(`${Base}create-payment-intent`,{
                    method:"POST",
                    body:JSON.stringify({amount:amount*100}),
                    headers:{
                        'Content-Type': 'application/json'
                    }
                });
    let response = await data.json();
    //.then(res => res.json())
    // .then(res =>{
    //     console.log(res,"res mn el payment");
    //     intent = object.create(res);
    //     console.log("el intent fy el action",intent);

    // })

     console.log("el intent fy el action",response);
     console.log("ana b3d el response el mafrood awaited");

    return{
        type:"payment-response",
        payload:response
    }
}
