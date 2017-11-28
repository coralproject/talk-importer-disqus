# Talk Importer

Importer of comments from "legacy systems" into our brilliant Coral Talk system :)

# Getting Started
## Install
```
$ node -v
v8.x.x

$ yarn
$ git submodule update --init
$ cd services/talk
$ yarnq
```
## Config
Add a `.env` file in the project root that contains the required environment variables for the Talk installation you are migrating into.

# Mapping file

The mapping file (eg strategy_disquss_example.json) contains information on how to map the source data model into the Talk one. 

* name: the name of the strategy to do the mapping
* service: credentials to connect to the source database or service to get data
* map: the actual mapping of entities

Note: Remember to add the asset url domain to the domain whitelist in Talk.

# DISQUS 

The example `strategy_disqus_example.json` has a mapping file for bringing Disqus posts into Talk comments. It also adds users of the comments and the thread (asset) that the comments are on. Name your Disqus strategy file `strategy_disqus.json`.


## How to structure a request in Disqus

https://disqus.com/api/{version}/{resource}.{output_type}

### Importing comments

A `forum` in Disqus contains all the comments, threads and settings for a website. We are going to import all the comments for a specific forum.

`Threads` are core discussions on the Disqus network. In Talk we call it a comments stream and in our data model is an Asset.

A `post` is an individual comment within a thread.

A user authors a thread, or a post in a thread.
A user likes a thread or a post in a thread.

#### Posts/list

Return list of posts ordered by the date created.

#### Relevant Fields for Talk

##### posts

```
 forum: the Disqus shortname of the forum which the comment was posted under.
 parent: the ID number of the parent comment. Will return null if it's a top-level comment.
 author: information about the comment author.
 isDeleted: whether the comment has been deleted or not.
 isApproved: whether the comment is approved or not.
 createdAt: the timestamp pf the comment when it was created.
 id: network-wide unique ID
 thread: the disqus thread id number that the comment belongs to.
 message: the body of the comment.
```

Documentation: https://disqus.com/api/docs/posts/list/


##### users

```
  username: the unique username associated with the account.
  name: the display name of the user.
  email: hashed email of the user
  joinedAt: the date/time that the user created the account
  about: the bio
```

Documentation:
* list of users in a forum: https://disqus.com/api/docs/forums/listUsers/
* details for a user: https://disqus.com/api/docs/users/details/

## Resources

* Concepts in Disqus data model: https://help.disqus.com/customer/portal/articles/1131785
* Library bindings for Disqus in Node: https://www.npmjs.com/package/disqus-node
* API documentation: https://disqus.com/api/docs/

# LIVEFYRE

* [Get Activity Stream Updates](https://api.livefyre.com/docs/apis/by-category/integration#operation=urn:livefyre:apis:boostrap:operations:api:v3.1:activity:method=get)

* [Get Content Thread](https://api.livefyre.com/docs/apis/by-category/collection-content#operation=urn:livefyre:apis:bootstrap:operations:api:v3.0:content:thread:method=get)

## License

    Copyright 2017 Mozilla Foundation

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.

    See the License for the specific language governing permissions and limitations under the License.