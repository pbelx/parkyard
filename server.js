var rest = require('restify')
var cors = require('cors')
var db = require('./appfunctions')
var app = rest.createServer()
app.use(cors())
app.use(rest.plugins.bodyParser())
app.get('/',(req,res)=>
{
    console.log(req)
    res.send('200 OK')
    console.log('got info')
})
//GEt all
app.post('/pay',(req,res)=>
{
    db.getall(req,res)
})
//insert plate info
app.post('/save',(req,res)=>
{
    db.insertplate(req,res)
})
//search plate
app.post('/search',(req,res)=>
{
    db.searchplate(req,res)
})
app.post('/total',(req,res)=>
{
    db.getsum(req,res)
})
app.post('/clearbill',(req,res)=>
{
    db.clearbill(req,res)
})
app.post('/getpayments',(req,res)=>
{
    db.getpayments(req,res)
})
app.post('/saveticket',(req,res)=>
{
    db.saveticket(req,res)
})
app.post('/vip',(req,res)=>
{
    db.vip(req,res)
})
app.post('/addclamp',(req,res)=>
{
    db.addclamp(req,res)
    // console.log(req.body)
})
app.post('/nonpay',(req,res)=>
{
    db.getcredit(req,res)
    // console.log(req.body)
})

app.listen(5000,()=>
{
    console.log('server up')
})
