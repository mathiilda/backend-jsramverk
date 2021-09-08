# Backend-jsramverk

This is the backend part of my project for the course jsramverk.


## How to use

1. Run <code>git clone https://github.com/mathiilda/backend-jsramverk</code> to download the repo from GitHub.

2. Run <code>npm install</code>.

3. Run <code>npm run start</code> to start the server.

4. Open <code>localhost:1337</code> in your browser to access the routes.

<br>

## Routes

The following routes are available:

- <code>/docs</code>, get all documents. Displays all the documents in the collection.
- <code>/docs/:id</code>, get a specific document. If possible, will return the document that matched the id in the url.
- <code>/docs/create/:title&text</code>, create a new document. Call this route with the right params and a new document will be created.
- <code>/docs/update</code>, updates a document. Call this route with the right params and the document with the matching id will be updated.

I wanted the name of the routes to give a clear picture of their purpose. I choose to add <code>/docs</code> in the beginning of each route, incase I want to add more routes to the API that doesn't necessarily has to do with the documents. For example, maybe I want to add the possibility to register a user, then I could start the routes related to users with <code>/users</code>.
