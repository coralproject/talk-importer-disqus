# Talk Importer

Importer of comments from "legacy systems" into our brilliant Coral Talk system :)

# DISQUS 

## How to structure a request in Disqus

https://disqus.com/api/{version}/{resource}.{output_type}
https://disqus.com/api/3.0/forums/listPosts.json?forum=disqus

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

author_id
asset_id
body
status
tags
metadata

##### users

```
  username: the unique username associated with the account.
  name: the display name of the user.
  email: hashed email of the user
  jonedAt: the date/time that the user created the account
  about: the bio
```

Documentation:
* list of users in a forum: https://disqus.com/api/docs/forums/listUsers/
* details for a user: https://disqus.com/api/docs/users/details/

## Resources

* Concepts in Disqus data model: https://help.disqus.com/customer/portal/articles/1131785
* Library bindings for Disqus in Node: https://www.npmjs.com/package/disqus-node
* API documentation: https://disqus.com/api/docs/
