const router = require('express').Router()
const { SQL } = require('../db')

router.get('/servers',async (req, res)=> {
    try {
        const servers = await SQL(`SELECT servers.*,
        companies.name as company
        FROM servers
        inner join companies on servers.company_id = companies.id`)
        res.send(servers)
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
})

router.get('/servers/online',async (req, res)=> {
    try {
     
        const serveronline = await SQL(`SELECT servers.*,
        companies.name as company
        FROM servers
        inner join companies on servers.company_id = companies.id
        WHERE servers.status = 1`)
        res.send(serveronline)
    
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
})


router.put('/server/status',async (req, res)=>{
    try {
        const {serverid, serverstatus} = req.body
        if(!serverid){
            return res.status(400).send({err:'server not found'})
        }
          
        if(serverstatus){
            await SQL(`UPDATE servers SET servers.status = 0 WHERE servers.id = ${serverid}`)
            return res.send({msg:'server offline'})
        }else{
            await SQL(`UPDATE servers SET servers.status = 1 WHERE servers.id = ${serverid}`)
            return res.send({msg:'server online'})
        }
       
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
})

module.exports = router