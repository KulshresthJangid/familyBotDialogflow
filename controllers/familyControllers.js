const express = require('express')
const mongoose = require('mongoose')
const Family = require('../models/familySchema')

exports.hello = async (req, res) => {
    res.send({
        message: "Hello World!"
    })
}

exports.addSuperParents = async(req, res) => {
    var childrenArray = req.body.childrens
    var parentsArray = req.body.parents
    var superParents = new Family()
    var superParentsChildrenArray = superParents.childrens
    var superParentsParentsArray = superParents.parents
    superParents.name = req.body.name
    childrenArray.forEach(el => {
        superParentsChildrenArray.push(el)
    })
    parentsArray.forEach(el => {
        superParentsParentsArray.push(el)
    })
    superParents.save(function(err, result) {
        if(err) {
            console.log("Error while saving the data", err)
            res.send({
                error: true,
                message: err.message
            })
        }
        console.log("Super parents added successfully", result)
        res.send({
            error: false,
            result
        })
    })
}

