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
        return new Promise((resolve, reject) => {
            this.client.connect(this.connection, function(err, db) {
                if (err) {
                    return reject(err);
                }
                let collection = db.collection('comments');
                return collection.find({comment_id}).limit(100).toArray(function(err, comment){
                    if (err) {
                        return reject(err);
                    }
                    return resolve(comment);
                });
            });
        });
    }

    get_comments() {
        return new Promise((resolve, reject) => {
            this.client.connect(this.connection, function(err, db) {
                if (err) {
                    return reject(err);
                }
                let collection = db.collection('comments');
                return collection.find({}).limit(100).toArray(function(err, comments){
                    if (err) {
                        return reject(err);
                    }
                    return resolve(comments);
                });
            });
        });
    }

    get_asset(asset_url) {
        return new Promise((resolve, reject) => {
            this.client.connect(this.connection, function(err, db) {
                if (err) {
                    return reject(err);
                }
                let collection = db.collection('assets');
                return collection.find({url: asset_url}).limit(100).toArray(function(err, asset){
                    if (err) {
                        return reject(err);
                    }
                    return resolve(asset);
                });
            });
        });
    }

  hasMore() {
      // @todo Implement pagination support
    return false;
  }
}

module.exports = Wapo;