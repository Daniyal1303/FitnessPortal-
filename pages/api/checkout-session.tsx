import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from "stripe";
const stripe = new Stripe("sk_test_51MHjkuBCwr8lEI4P3w1HQKXVmS07N9UUh9nlaWCUorgL4yck4tPU64HKNevl0UfCB2sGVsNJkmzrid1Fj1JB6wqZ00tTbhYcnn", {
    apiVersion: '2022-11-15',
  })

export default async function handler(req:NextApiRequest,res:NextApiResponse){



    if(req.method == "POST"){

        const user = req.body
        console.log("user" , user)
        const pay = user.payableFees

        

        try{
            const params: Stripe.Checkout.SessionCreateParams = {
                submit_type: "pay",
                mode: "payment",
                payment_method_types: ["card"],
                line_items:[{
                        price_data:{
                            currency: "usd",
                            product_data:{
                                name: user.userName,
                                
                            },
                            unit_amount: pay * 100
                        },
                        adjustable_quantity:{
                            enabled: false
                        },
                        quantity:1
                    }],
            
                success_url: `${req.headers.origin}/success`,
                cancel_url: `${req.headers.origin}/cancel`
            };
            const session = await stripe.checkout.sessions.create(params);
            console.log(session)
            res.status(200).json(session)


        }catch(error:any){
            res.status(500).json({ statusCode: 500 ,message: error.message})
        }
    }else{
        res.setHeader("Allow", "POST")
        res.status(405).end("Method not allowed")
    }
}