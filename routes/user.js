const { response } = require('express');
var express = require('express');
var router = express.Router();
var quehelp = require('../mongo-help/question-help');
const userHelp = require('../mongo-help/user-help');

router.get('/', (req, res) => {     //Index page
    if (req.session.login) {
        res.redirect('/aprofile')
    }
    else {
        res.render('index')
    }
})

router.get('/login', (req, res) => { //login page
    if (req.session.logerr) {
        var logerr = true
    }
    else if (req.session.login) {
        res.redirect('/aprofile')
    }
    res.render('user/login', { logerr })
})

router.post('/login', (req, res) => {
    userHelp.dologin(req.body).then((response) => {
        if (response.status) {
            req.session.user = response.user
            req.session.login = true
            res.redirect('/aprofile')
        }
        else {
            req.session.logerr = true
            res.redirect('/login')
        }
    })
})

router.get('/aprofile', (req, res) => {  //profile page
    if (req.session.login) {
        var use = req.session.user
        quehelp.getuser(use).then((response) => {
            var sub = response.sub   //Subscription details
            var ans = response.answer
            var org = response.org
            var r = response.result
            var test = response.test
            //console.log(test);
            var l = sub.limit
            l = parseInt(l)
            if (sub === 0) {
                sub = false
            }
            else {
                var g = new Date
               
                if ((g - sub.date) > l || (g - sub.date) == l) {
                    sub = false
                }
                else if (sub.t == 0) {
                    sub = false
                }
                else {
                    sub = true
                }
            }
            if (req.session.o) {
                var o = true
            }
            res.render('admin/profile', { test, use, sub, ans, org, r, o })
            
        })
    }
    else {
        res.redirect('/login')
    }
})

router.get('/signup', (req, res) => {  //signup page
    res.render('user/signup')
})

router.get('/wtest', (req, res) => {
    var user = req.query.name
    var sub = req.query.testname
    var c = req.query.case
    if (c == 't') {
        c = true
    }
    else {
        c = false
    }
    quehelp.gettime(user, sub).then((response) => {
        var y = response.year
        var mn = response.mon
        var d = response.day
        var h = response.ho
        var m = response.min
        var s = response.sec
        res.render('wait', { y, mn, d, h, m, s, user, sub, c })
    })
})
router.post('/signup', (req, res) => {
    userHelp.doSignup(req.body).then((response) => {  //sigup completed
        res.render('tutorial')
    })
})
router.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/')
})
router.post('/profile', (req, res) => {  //guest profile
    var data = req.body
    var username = req.body.username
    quehelp.getuser(data).then((response) => {
        var userr = username
        var tes = response.test
        var rr = response.result
        res.render('admin/profile', { userr, tes, guest: true, rr })
    })
})

router.get('/questions', (req, res) => {
    var user = req.session.user
    userHelp.getsub(user.username).then((response) => {
        var s = response
    
        if (s.t == 0) {
            req.session.o = true
            res.redirect('/aprofile')
        }
        else {
            
            res.render('admin/questions', { user })
        }
    })
})

router.get('/check', (req, res) => {
    var v = req.query.n
    var sub = req.query.testname
    res.render('check', { v, sub })
})
router.post('/demo', (req, res) => {  //demo page for organizers
    var v = req.body.user
    var b = req.body.test
    var c = req.body.code
    var data = { v, b }
    quehelp.getQuestion(data).then((response) => {
        var questions = response[0].questions
        var y = response[0].year1
        var mn = response[0].mon1
        var d = response[0].day1
        var h = response[0].ho1
        var m = response[0].min1
        if (c == response[0].code) {
            questions[0] = null
            questions[questions.length] = null
            res.render('user/test', { demo: true, questions, v, b, test: true,y, mn, d, h, m})
        }
        else {
            var sub = b
            res.render('check', { v, sub, d: true,})
        }
    })
})

router.get('/testw', (req, res) => {
    var n = req.query.name
    var r = req.query.roll
    var v = req.query.user
    var b = req.query.test
    var data = { v, b }
    quehelp.getQuestions(data).then((response) => {
        if (response == false) {
            res.redirect('/wtest?case=t')
        }
        else {
            var y = response[0].year1
            var mn = response[0].mon1
            var d = response[0].day1
            var h = response[0].ho1
            var m = response[0].min1
            var questions = response[0].questions
            questions[0] = null
            questions[questions.length] = null
            res.render('user/test', { questions, v, b, test: true, n, r, y, mn, d, h, m })
        }
    })
})
router.get('/sketch', (req, res) => {
    res.render('user/sketch')
})
router.get('/delete', (req, res) => {
    var v = req.query.user
    var b = req.query.test
    quehelp.deletequestions(v, b).then((response) => {
        res.redirect('/aprofile')
    })
})
router.get('/edited', (req, res) => {
    var v = req.query.user
    var b = req.query.test
    var data = { v, b }
    quehelp.getQuestions(data).then((response) => {
        var questions = response[0].questions
        questions[0] = null
        questions[questions.length] = null
        var resp = response
        res.render('admin/questions', { edit: true, v, b, questions, resp })
    })
})

router.post('/edit', (req, res) => {
    var data = req.body
    
    quehelp.updatequestion(data).then((response) => {
        console.log('updated');
        res.redirect('/aprofile')
    })
})

router.post('/test', (req, res) => {
    quehelp.addanswers(req.body).then((response) => {
        res.redirect('/')
    })
})

router.get('/results', (req, res) => {
    var user = req.query.user
    var sub = req.query.sub
    var data = { user, sub }
    userHelp.getresult(data).then((response) => {
        var result = response
        res.render('user/results', { result })
    })
})

router.get('/forgot',(req,res)=>{
    console.log('key');
    var c = req.query.id
    var u = req.query.user
    var data ={c,u}
    userHelp.forget(data).then((response)=>{
        if(response==true){
            res.json({t:'t'})
        }
    })
})

router.get('/forgetadd',(req,res)=>{
    var u = req.query.username
    var password = req.query.password
    var data = {u,password}
    quehelp.updatepass(data).then((response)=>{
        res.json(true)
    })
   
})

router.post('/send',(req,res)=>{
    var u = req.body.username
    userHelp.sendkey(u).then((response)=>{
       
        if(response==true){
            console.log('true');
            res.render('forget',{u})
        }
        else{
           console.log('false');
           res.redirect('/login')
        }
    })
})

router.get('/tt',(req,res)=>{
    res.render('tutorial')
})
module.exports = router;
