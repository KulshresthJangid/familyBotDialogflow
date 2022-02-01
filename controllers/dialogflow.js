const express = require('express')
const mongoose = require('mongoose')
const dfff = require('dialogflow-fulfillment')
const { findAllMembers, payLoadMaker, familyMemberInfo, capitalizeFirstLetter } = require('../utils/utils')

familyMemberInfo('ina')

exports.answers = async(req, res) => {
    try {
        console.log("Bot is calling for the request")
        const agent = new dfff.WebhookClient({
            request: req, 
            response: res
        })
        async function demo(agent) {
            agent.add("Hello Welcome to Mishan Family bot made by Kulshresth Jangid you can ask about every family member from mishan family")
            console.log("-------Demo got called")
            let arr = await findAllMembers()
            let payload = await payLoadMaker(arr)
            agent.add(new dfff.Payload(agent.UNSPECIFIED, payload, {sendAsMessage: true, rawPayload: true}))
        }

        async function familyInfo(agent) {
            var parameter = agent.parameters.person.name
            var name = await capitalizeFirstLetter(parameter)
            var info = await familyMemberInfo(name)
            console.log(info)
            if(info.length === 0) {
                agent.add("Sorry no member found for now")
            } else {
                let childrenArray = info[0].childrens
                console.log(childrenArray)
                agent.add(`Parent's name of ${name} is ${info[0].parents[0]} and they have ${childrenArray.length} children ${childrenArray.join(",")}`)
            }
            
            console.log("-------------", name)
        }
        var intentMap = new Map()
        intentMap.set('WelcomeIntent', demo)
        intentMap.set('FamilyInfoIntent', familyInfo)
        agent.handleRequest(intentMap)
    } catch (e) {
        console.log("Error while getting to the dialogue flow bot.", e)
    }
}