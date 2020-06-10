var mysql = require('mysql')

function getall(req,res)
{
    // console.log(req.body.plate)
    var con = mysql.createConnection({

        host: '127.0.0.1',
        user: 'testa',
        password: 'testa',
        database: 'parking4'
     
    })
    
    con.connect((err)=>{
        if (err)
        {
            console.log(err)
        }else
        {
            sql = "SELECT * FROM clients ORDER BY pid DESC LIMIT 10;"
            con.query(sql,(err,result)=>
            {
                if (err)throw err;
//                console.log(result)
                res.send(result)
                con.end()
    
            })
        }
    
    })
}
function insertplate(req,res)
{
    // console.log(req.body.plate)
    var con = mysql.createConnection({

        host: '127.0.0.1',
        user: 'testa',
        password: 'testa',
        database: 'parking4'
     
    })
    var plate = req.body.plate
    var invoice = req.body.invoice
    var date = req.body.date 
    var location = req.body.location
    var time = req.body.time
    var dtime = req.body.dtime
    var status = req.body.status
    var fine = req.body.fine
    
    con.connect((err)=>{
        if (err)
        {
            console.log(err)
        }else
        {
            sql = "INSERT INTO clients (plate,invoice,parkdate,location,time,dtime,status,fine) VALUES (?,?,?,?,?,?,?,?);"
            con.query(sql,[plate,invoice,date,location,time,dtime,status,fine],(err,result)=>
            {
                if (err)throw err;
                // console.log(result)
                res.send(result)
                con.end()
    
            })
        }
    
    })
}
function searchplate(req,res)
{
    // console.log(req.body.plate)
    var con = mysql.createConnection({

        host: '127.0.0.1',
        user: 'testa',
        password: 'testa',
        database: 'parking4'
     
    })
    var plate = '%' + req.body.plate + '%'
    
    
    con.connect((err)=>{
        if (err)
        {
            console.log(err)
        }else
        {
            sql = "SELECT *,DATE_FORMAT(parkdate,'%d-%M-%y') as pdate FROM clients WHERE plate LIKE ? ORDER BY parkdate;"
            // sql2 = "SELECT sum(fine) FROM clients WHERE plate=?"
            con.query(sql,[plate],(err,result)=>
            {
                if (err)throw err;
                // console.log(result)
                res.send(result)
                
    
            })
        }
    
    })
}
function getsum(req,res)
{
    // console.log(req.body.plate)
    var con = mysql.createConnection({

        host: '127.0.0.1',
        user: 'testa',
        password: 'testa',
        database: 'parking4'
     
    })
    
    con.connect((err)=>{
        if (err)
        {
            console.log(err)
        }else
        {
            var plate = req.body.plate
            sql = "SELECT sum(fine) as total FROM clients WHERE plate=?"
            con.query(sql,[plate],(err,result)=>
            {
                if (err)throw err;
                // console.log(result)
                res.send(result)
                con.end()
    
            })
        }
    
    })
}
function clearbill(req,res)
{
    // console.log(req.body.plate)
    var con = mysql.createConnection({

        host: '127.0.0.1',
        user: 'testa',
        password: 'testa',
        database: 'parking4'
     
    })
    
    con.connect((err)=>{
        if (err)
        {
            console.log(err)
        }else
        {
            var plate = req.body.plate
            var amount = req.body.amount
            var receipt = req.body.receipt
            var status = "fine"
            sql = "INSERT INTO billing(plate,amount,receipt,status) VALUES (?,?,?,?)"
            sql2 = "DELETE FROM clients WHERE plate=?" 
            con.query(sql,[plate,amount,receipt,status],(err,result)=>
            {
                if (err)throw err;
                // console.log(result)
                // res.send(result)
                con.query(sql2,[plate],(err,receipt)=>
                {
                    if (err) throw err;
                    res.send("OK")
                })
                // con.end()
    
            })
        }
    
    })
}
function getpayments(req,res)
{
    // console.log(req.body.plate)
    var con = mysql.createConnection({

        host: '127.0.0.1',
        user: 'testa',
        password: 'testa',
        database: 'parking4'
     
    })
    
    con.connect((err)=>{
        if (err)
        {
            console.log(err)
        }else
        {
            var plate = req.body.plate
            sql = "SELECT *,DATE_FORMAT(date, '%d-%M-%Y') AS date FROM billing ORDER BY date DESC LIMIT 10;"
            con.query(sql,(err,result)=>
            {
                if (err)throw err;
                // console.log(result)
                res.send(result)
                con.end()
    
            })
        }
    
    })
}
function saveticket(req,res)
{
    // console.log(req.body.plate)
    var con = mysql.createConnection({

        host: '127.0.0.1',
        user: 'testa',
        password: 'testa',
        database: 'parking4'
     
    })
    
    con.connect((err)=>{
        if (err)
        {
            console.log(err)
        }else
        {
            var plate = req.body.plate
            var receipt = req.body.receipt
            var duration = req.body.duration
            var amount = req.body.amount
            var status = "Sticker"
            
            // var expiry = ''
            // console.log(sql)
            // var expiry = ""

            sql = "INSERT INTO tickets(plate,receipt,duration,amount) VALUES(?,?,?,?)"
            sql2 = "update tickets set expiry = (SELECT DATE_ADD(now(), INTERVAL +? DAY)) where plate=?"
            sql3 = "insert into clients (plate,status) SELECT plate,DATE_FORMAT(expiry, '%d-%M-%Y') from tickets where plate=?"
            sql4 = "insert into billing(plate,receipt,amount,status) values (?,?,?,?);"
            // console.log(sql)
            con.query(sql,[plate,receipt,duration,amount],(err,result)=>
            {
                if (err)throw err;
                console.log(result)
                // res.send(result)
                // con.end()
                con.query(sql2,[duration,plate],(err,result)=>{
                    if (err) throw err;

                    // console.log(sql2 + duration)
                    // res.send(result)
                    con.query(sql3,[plate],(err,result)=>
                    {
                        if(err) throw err;
                        // var amount = ""
                        // if(duration > 50){
                        //     amount = 3
                        // }
                       con.query(sql4,[plate,receipt,amount,status],(err,result)=>
                       {
                            if(err) throw errr;
                            res.send(result)
                       })
                    })
                })
    
            })
        }
    
    })
}
function vip(req,res)
{
    // console.log(req.body.plate)
    var con = mysql.createConnection({

        host: '127.0.0.1',
        user: 'testa',
        password: 'testa',
        database: 'parking2'
     
    })
    
    con.connect((err)=>{
        if (err)
        {
            console.log(err)
        }else
        {
            var plate = req.body.plate
            sql="UPDATE clients SET status='Exempt' where plate=?"
            con.query(sql,[plate],(err,result)=>
            {
                if (err)throw err;
                // console.log(result)
                res.send(result)
                con.end()
    
            })
        }
    
    })
}
function addclamp(req,res)
{
    // console.log(req.body.plate)
    var con = mysql.createConnection({

        host: '127.0.0.1',
        user: 'testa',
        password: 'testa',
        database: 'parking4'
     
    })
    
    con.connect((err)=>{
        if (err)
        {
            console.log(err)
        }else
        {
            var plate = req.body.plate
            sql="UPDATE clients SET fine=fine+20000 where plate=?"
            con.query(sql,[plate],(err,result)=>
            {
                if (err)throw err;
                console.log('clamp added')
                res.send(result)
                con.end()
    
            })
        }
    
    })
}
function getcredit(req,res)
{
    // console.log(req.body.plate)
    var con = mysql.createConnection({

        host: '127.0.0.1',
        user: 'testa',
        password: 'testa',
        database: 'parking4'
     
    })
    
    con.connect((err)=>{
        if (err)
        {
            console.log(err)
        }else
        {
            var plate = req.body.plate
            sql="SELECT plate,location,time,Dtime,parkdate,fine FROM clients WHERE fine > 0;"
            con.query(sql,[plate],(err,result)=>
            {
                if (err)throw err;
                // console.log('clamp added')
                res.send(result)
                con.end()
    
            })
        }
    
    })
}

module.exports = 
{
    getall,insertplate,searchplate,getsum,clearbill,getpayments,saveticket,vip,addclamp,getcredit
}
