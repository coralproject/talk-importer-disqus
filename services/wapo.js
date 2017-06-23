#!/usr/bin/env node

const mongodb = require('mongodb');
const Source = require('./source');

class Wapo extends Source {
    constructor(service) {
        super(service);
        
        this.client = mongodb.MongoClient
        this.connection = service.connection;
    }

    find_comment(comment_id) {
        return new Promise((resolve)=> resolve());
        //return commentModel.findById(comment_id);
    }

    get_comments() {
        console.log('1');
        return new Promise((resolve, reject) => {
            console.log('2');
            this.client.connect(this.connection, function(err, db) {
                console.log('3');
                if (err) {
                    console.log('4', err);
                    return reject(err);
                }
                console.log('5');
                let collection = db.collection('comments');
                console.log('6');
                collection.find().toArray(function(err, comments){
                    console.log('7');
                   return resolve(comments);
                });
                console.log('8');
            });
        });
    }

    get_asset(asset_id) {
        return new Promise();
        // const query = {id: assetid};
        // return assetModel.findOne(query);
    }
}

module.exports = Wapo;