var db = require('../config/connection')
var Collection = require('../config/collections');
const { use } = require('../routes/user');
const { response } = require('express');
const objectid = require('mongodb').ObjectID
const bcrypt = require('bcrypt')
module.exports = {
    addquestion: async(questions, callback) =>{
        var s = await db.get().collection(Collection.subscribe).findOne({username:questions.username})
        s = s.t
        if(s==0){
            callback(false)
        }
        else{
            s = s-1
            db.get().collection(Collection.subscribe).updateOne({username:questions.username},{
                $set:{
                    t:s
                }
            })
        db.get().collection(Collection.cotest).insertOne({subject:questions.subject,username:questions.username,date:new Date}).then((data)=>{
            callback(true)
        })      
        db.get().collection('questions').insertOne(questions).then((data) => {
            callback(true)
        })
    }
    },
    addanswers: (answers) => {
        return new Promise(async(resolve,reject)=>{
        console.log('answers adding')
        let d = await db.get().collection(Collection.coanswer).findOne({username:answers.username,subject:answers.subject})
        if(d){
        db.get().collection('answers').insertOne(answers).then((data) => {
            resolve(true)
        })
       }
       else{
           db.get().collection(Collection.coanswer).insertOne({username:answers.username,subject:answers.subject})
           db.get().collection('answers').insertOne(answers).then((data) => {
            resolve(true)
        })
       }
    })
    },
    getQuestions: (userdata) => {
        console.log(userdata);
        return new Promise(async (resolve, reject) => {
            let s = await db.get().collection(Collection.subscribe).findOne({username:userdata.v})
            s =s.n
            if(s==0){
                resolve(false)
            }
            else{
                s = s-1
                db.get().collection(Collection.subscribe).updateOne({username:userdata.v},{
                    $set:{
                        n:s
                    }
                })
            let response = await db.get().collection('questions').find({username:userdata.v,subject:userdata.b}).toArray()
            resolve(response)
            }
        })
    },
    getanswers:(userd)=>{
        console.log(userd.v);
        return new Promise(async (resolve,reject)=>{
            let answers = await db.get().collection('answers').find({username:userd.v,subject:userd.b},{answers:1,_id:0}).sort({answers:-1}).toArray()
            resolve(answers)
        })
    },
    getuser:(userdata)=>{
        return new Promise(async (resolve,reject)=>{
            let response ={}
            let user =await db.get().collection(Collection.signup).findOne({username:userdata.username})
            if(user)
            {
                var answers = await db.get().collection(Collection.coanswer).find({username:userdata.username}).sort({subject:-1}).toArray()
                var sub = await db.get().collection(Collection.subscribe).findOne({username:userdata.username})
                var result = await db.get().collection(Collection.coresult).find({username:userdata.username}).toArray()
                let test = await db.get().collection(Collection.cotest).find({username:userdata.username}).toArray()
                response.result = result
                response.answer = answers
                response.sub = sub
                response.org = user.org
                for(h in test){
                    var jj = test[h].date
                    const li = 1209600000
                    if(new Date-jj==li || new Date-jj>li){
                        db.get().collection('questions').removeOne({username:userdata.username,subject:test[h].subject})
                        db.get().collection('answers').removeOne({username:userdata.username,subject:test[h].subject})
                        db.get().collection(Collection.cotest).removeOne({username:userdata.username,subject:test[h].subject})
                   }
                }
                test = await db.get().collection(Collection.cotest).find({username:userdata.username}).toArray()
                response.test = test
                resolve(response)
            }
            else{
                response.status = false
            }
            if(result){
                response.status1 = true
            }
            else{
                response.status1 = false
            }
            resolve(response)
        })
    },
    getQuestion: (userdata) => {
        console.log(userdata);
        return new Promise(async (resolve, reject) => {
            let response = await db.get().collection('questions').find({username:userdata.v,subject:userdata.b}).toArray()
            resolve(response)
        })
    },
    deletequestions:(user,test)=>{
        console.log('deleting');
        return new Promise((resolve,reject)=>{
            (user,test)=>{
                return new Promise((resolve,reject)=>{
                    db.get().collection('answers').removeOne({username:user,subject:test}).then((response)=>{
                        console.log('deleans');
                        resolve(response)
                    })
                })
            }
            db.get().collection('questions').removeOne({username:user,subject:test}).then((response)=>{
                resolve(response)
            })
        })
    },
    updatequestion:(data)=>{
        console.log(data.min);
        return new Promise((resolve,reject)=>{
            db.get().collection('questions').updateOne({username:data.username,subject:data.subject},{
              $set:{
                  questions:data.questions,
                  year:data.year,
                  day:data.day,
                  ho:data.ho,
                  mon:data.mon,
                  min:data.min,
                  sec:data.sec,
                  subject:data.subject,
                  year1:data.year1,
                  mon1:data.mon1,
                  day1:data.day1,
                  ho1:data.ho1,
                  min1:data.min1
              }
            }).then((reponse)=>{
                resolve()
            })
        })
    },
    addresult:(data)=>{
        return new Promise(async(resolve,reject)=>{
            let d = await db.get().collection(Collection.coresult).findOne({username:data.username,subject:data.subject})
            if(d){
            let c = await db.get().collection(Collection.result).findOne({username:data.username,subject:data.subject,roll:data.roll,name:data.name})
            if(c){
                db.get().collection(Collection.result).updateOne({username:data.username,subject:data.subject,roll:data.roll,name:data.name},{
                    $set:{
                     marks:data.marks,
                     name:data.name,
                     roll:data.roll
                    }
                }).then((response)=>{
                    resolve(response)
                })
            }
            else{
            db.get().collection(Collection.result).insertOne(data).then((data)=>{
                resolve(data)
            })
         }
        }
        else{
            db.get().collection(Collection.coresult).insertOne({username:data.username,subject:data.subject})
            let c = await db.get().collection(Collection.result).findOne({username:data.username,subject:data.subject,roll:data.roll})
            if(c){
                db.get().collection(Collection.result).updateOne({username:data.username,subject:data.subject,roll:data.roll,name:data.name},{
                    $set:{
                     marks:data.marks,
                     name:data.name,
                     roll:data.roll
                    }
                }).then((response)=>{
                    resolve(response)
                })
            }
            else{
            db.get().collection(Collection.result).insertOne(data).then((data)=>{
                resolve(data)
            })
         }
        }
        })
    },
    gettime:(user,sub)=>{ 
        return new Promise(async(resolve,reject)=>{
            let response = await db.get().collection('questions').findOne({username:user,subject:sub})
            resolve(response)
        })
    },
    updatepass :(data)=>{
        return new Promise(async(resolve,reject)=>{
            let p =await bcrypt.hash(data.password, 10)
            db.get().collection(Collection.signup).updateOne({username:data.u},{
                $set:{
                    password:p
                }
            }).then((response)=>{
                resolve(response)
            })
        })
    },
}
