const router = require("express").Router()


router.get(`/api/time`, (req,res)=>{
    const time = Date.now()
    res.send({time:time})
})

module.exports = router