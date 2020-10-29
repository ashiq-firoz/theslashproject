var db = require('../config/connection')
var Collection = require('../config/collections')
const bcrypt = require('bcrypt')
const { response } = require('express')
const Razorpay = require('razorpay')
const { resolve } = require('path')
var instance = new Razorpay({
    key_id: 'rzp_test_mphMKcv6dG6sWD',
    key_secret: 'b2xpMFgEXZ5sCvIn0oTH7Tw6',
});
module.exports = {
    doSignup: (userdata) => {
        return new Promise(async (resolve, reject) => {
            userdata.password = await bcrypt.hash(userdata.password, 10)
            db.get().collection(Collection.subscribe).insertOne({ username: userdata.username, sub: 0, date: 0, limit: 0, n: 0, t: 0 })
            db.get().collection(Collection.signup).insertOne(userdata).then((data) => {
                resolve(data.ops[0])
            })

        })
    },
    dologin: (userdata) => {
        return new Promise(async (resolve, reject) => {
            let loginstatus = false
            let response = {}
            let user = await db.get().collection(Collection.signup).findOne({ username: userdata.username })

            if (user) {
                bcrypt.compare(userdata.password, user.password).then((status) => {
                    if (status) {
                        console.log("login success");
                        response.status = true
                        response.user = user
                        resolve(response)
                    }
                    else {
                        console.log("login failed");
                        resolve({ status: false })
                    }
                })
            }
            else {
                console.log("login failed");
                resolve({ status: false })
            }
        })
    },
    doattent: (code) => {
        return new Promise(async (resolve, reject) => {
            let response = await db.get().collection('questions').find({ username: userdata.v, subject: userdata.b })
            if (response.code == code) {
                resolve(response.questions)
            }
            else {
                resolve(false)
            }
        })
    },
    getresult: (data) => {
        console.log('getresult');
        return new Promise(async (resolve, reject) => {
            let result = await db.get().collection(Collection.result).find({ username: data.user, subject: data.sub }, { name: 1, roll: 1, marks: 1, _id: 0 }).sort({ name: -1 }).toArray()
            resolve(result)
        })
    },
    getuse: (data) => {
        return new Promise(async (resolve, reject) => {
            let t = await db.get().collection('users').findOne({ username: data })
            if (t) {
                resolve(true)
            }
            else {
                resolve(false)
            }
        })
    },
    generaterazopay: (user, total) => {
        console.log('razo');
        return new Promise((resolve, reject) => {
            var options = {
                amount: total,  // amount 
                currency: "INR",
                receipt: user
            };
            instance.orders.create(options, function (err, order) {
                if (err) {
                    console.log(err);
                }
                console.log("New order" + order);
                resolve(order)
            });
        })
    },
    verifypayment: (data) => {
        return new Promise((resolve, reject) => {
            const crypto = require('crypto')
            let hmac = crypto.createHmac('sha256', 'b2xpMFgEXZ5sCvIn0oTH7Tw6')
            hmac.update(data['payment[razorpay_order_id]'] + '|' + data['payment[razorpay_payment_id]'])
            hmac = hmac.digest('hex')
            if (hmac == data['payment[razorpay_signature]']) {
                resolve()
            }
            else {
                reject()
            }
        })
    },
    updatesub: (user, limit, n, t) => {
        return new Promise((resolve, reject) => {
            db.get().collection(Collection.subscribe).updateOne({ username: user }, {
                $set: {
                    sub: 1,
                    date: new Date,
                    limit: limit,
                    n: n,
                    t: t,
                }
            }).then(() => {
                resolve()
            })
        })
    },
    getsub: (data) => {
        return new Promise(async (resolve, reject) => {
            let sub = await db.get().collection(Collection.subscribe).findOne({ username: data })
            resolve(sub)
        })
    },
    sendkey: (user) => {
        return new Promise(async (resolve, reject) => {
            var v = ("" + Math.random()).substring(2, 8)
            db.get().collection(Collection.signup).updateOne({ username: user }, {
                $set: {
                    key: v
                }
            })
            let f = await db.get().collection(Collection.signup).findOne({username: user })
            console.log(f);
            const nodemailer = require('nodemailer');
            let mailTransporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'theslashproject000@gmail.com',
                    pass: 'Edith#include08'
                }
            });
           console.log('created');
            let mailDetails = {
                from: 'theslashproject000@gmail.com',
                to: f.email,
                subject: 'Here is your code',
                text: v
            };
           console.log('sending');       
             mailTransporter.sendMail(mailDetails, function (err, data) {
                if (err) {
                    console.log('Error Occurs');
                     resolve(false)
                } else {
                    console.log('Email sent successfully');
                    resolve(true)
                }
            })    
        })
    },
    forget:(data)=>{
        return new Promise(async(resolve,reject)=>{
            let f =await db.get().collection(Collection.signup).findOne({username:data.u})
            if(f.key==data.c){
                resolve(true)
            }
            else{
                resolve(false)
            }
        })
    },
    getusers:()=>{
        return new Promise(async(resolve,reject)=>{
            let s = await db.get().collection(Collection.signup).find().toArray()
            let su = await db.get().collection(Collection.subscribe).find().toArray()
            var response = {}
            response.s= s
            response.su = su
            resolve(response)
        })
    }
}