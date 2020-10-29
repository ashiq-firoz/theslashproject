const { response } = require('express');
var express = require('express');
var router = express.Router();
var quehelp = require('../mongo-help/question-help');
const userHelp = require('../mongo-help/user-help');
/* GET users listing. */
router.post('/questions', (req, res) => {
  quehelp.addquestion(req.body, (result) => {
    if(result==false){
      res.render('admin/questions')
    }
    else{
    res.redirect('/aprofile')
    }
  })
})
router.get('/creator',(req,res)=>{
  res.render('admin/cre')
})
router.get('/checku',(req,res)=>{
  var n = req.query.name
  userHelp.getuse(n).then((response)=>{
    if(response){
      res.json({status:false})
    }
    else{
      res.json({status:true})
    }
  })
})

router.get('/answers',(req,res)=>{
  var v = req.query.user
  var b = req.query.subject
  var  data = {v,b}
  quehelp.getanswers(data).then((response)=>{
    var answer = response[0]
    var i =0
    var l = response.length
    console.log('answers');
    console.log(l);
    l=parseInt(l)
    if(l-1==i){
      var finis = 'true'
    }
    i=i+1
    res.render('admin/answer',{l,answer,i,v,b,finis})
  })
})

router.get('/addresult',(req,res)=>{
  var marks = req.query.total
  var subject = req.query.subject
  var roll = req.query.roll
  var name = req.query.name
  var username = req.query.user
  var data = {marks,roll,name,subject,username}
  quehelp.addresult(data).then((response)=>{
      res.json(response)
  })
})

router.get('/answer',(req,res)=>{
  var i = req.query.id
  var v = req.query.user
  var b = req.query.sub
  var bac = req.query.bac
  var data={v,b}
  i=parseInt(i)
  quehelp.getanswers(data).then((response)=>{
    if(bac==='t'){
      i=i-2
      response=response[0]
      var l = response.length
      l=parseInt(l)
      if(l-1===i){
        var finish=true
       }
       else{
         finish=false
       }
       i=i+1
       res.json({response,finish,i}) 
    }
    else{
    var l = response.length
    l=parseInt(l)
    if(l-1==i){
     var finish=true
    }
    response = response[i]
    i=i+1
    res.json({response,finish,i})
  }
  })
})

router.get('/subscribe',(req,res)=>{
  var u = req.query.user
  var org = req.query.org
  if(org==='t'){
    org=true
  }
  else{
    org=false
  }
  res.render('user/subscribe',{org,u})
})
let limit=0
let n=0
let t = 0
router.get('/pay',(req,res)=>{
  var total = req.query.value
  var user = req.query.user
  limit = req.query.limit
  n=req.query.n
  t = req.query.t
  total = parseInt(total)
  res.render('success',{total,user,limit})
})
router.get('/payment',(req,res)=>{
  var total = req.query.total
  var user = req.query.user
  total = parseInt(total)
  total= total*100 
  //console.log(user+" "+total);
  userHelp.generaterazopay(user,total).then((response)=>{
    //console.log(response);
    res.json(response)
  })
})
router.post('/verify',(req,res)=>{
  limit=parseFloat(limit)
  n=parseInt(n)
  t = parseInt(t)
 // console.log(req.body);
  userHelp.verifypayment(req.body).then(()=>{
      limit = 155520000000*limit
      userHelp.updatesub(req.body['order[receipt]'],limit,n,t).then(()=>{
             console.log(req.body['order[receipt]']);
             res.json({status:true})
      }).catch((err)=>{
        console.log(err);
        res.json({status:false})
      })
  })
})

router.get('/crea',(req,res)=>{
  userHelp.getusers().then((response)=>{
    var users = response.s
    var s = response.su
  //  console.log(users);
  //  console.log(response);
    res.render('admin/crea',{users,s})
  })
})
module.exports = router;
