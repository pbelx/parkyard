var db = require('./sqlfunctions')

function getall(req,res)
{
    db.getall(req,res)
}

function insertplate(req,res)
{
    db.insertplate(req,res)
}
function searchplate(req,res)
{
    db.searchplate(req,res)
}
function getsum(req,res)
{
    db.getsum(req,res)
}
function clearbill(req,res)
{
    db.clearbill(req,res)
}
function getpayments(req,res)
{
    db.getpayments(req,res)
}
function saveticket(req,res)
{
    db.saveticket(req,res)
}
function vip(req,res)
{
    db.vip(req,res)
}
function addclamp(req,res)
{
    db.addclamp(req,res)
}
function getcredit(req,res)
{
    db.getcredit(req,res)
}

module.exports = 
{
    getall,insertplate,searchplate,getsum,clearbill,getpayments,saveticket,vip,addclamp,getcredit
}
