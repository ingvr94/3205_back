import express,{Express,Request,Response,NextFunction} from 'express'
import cors from 'cors'

type ReqType={
    email:string
    number:string
  }

const items=require('../data.json')
const app:Express=express()

const port=process.env.port || 9001

app.listen(port,()=>console.log(`Server is listening on port ${port}`))
app.use(express.json())

app.use(cors<Request>())
app.all('/*', function(req:Request, res:Response, next:NextFunction) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
  });

app.post('/',(req:Request,res:Response)=>{
    let email:String=req.body.email
    let number:String=req.body.number.replaceAll('-','')
    let searchResult:ReqType[]=[]

    items.map((el:ReqType)=>{
        if ((el.email===email && number==='') || (el.email===email && el.number.toString()===number)) {
            searchResult.push(el)
        }
    })

    setTimeout((()=>{
     res.send(searchResult)
    }), 5000)
})