const mongoose = require('mongoose')
const Family = require('../models/familySchema')

const findAllMembers = async () => {
    return new Promise((resolve, reject) => {
        Family.find({}, function (err, data) {
            if(err) {
                console.log("Error while getting the family Data", err)
                reject(err)
            }
            var newArr = data.map(el => el.name)
            console.log("Family data found", newArr)
            resolve(newArr)
        })
    })
}

const familyMemberInfo = async (name) => {
    return new Promise((resolve, reject) => {
        Family.find({ name }, function(err, data) {
            if(err) {
                console.log("Error while getting the memeber info",err)
                reject(err)
            }
            console.log("Member info found", data)
            resolve(data)
        })
    })
}

async function payLoadMaker(arr) {
    return new Promise((resolve, reject) => {
        try{
            var payloadSchema =  {
                "richContent": [
                    [
                        {
                            "type": "chips",
                            "options": []
                        }
                    ]
                ]
            }
            let i;
            for(i=0;i<=arr.length;i++) {
                var array = payloadSchema.richContent[0][0].options
                var obj = {
                    "text": arr[i]
                }
                array.push(obj)
            }
            resolve(payloadSchema)
        } catch(e) {
            console.log("Error from payloadMaker", e)
            reject(e)
        }
        
    })
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

module.exports = {
    findAllMembers,
    payLoadMaker,
    familyMemberInfo,
    capitalizeFirstLetter
}