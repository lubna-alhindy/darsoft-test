## Installation

```bash
$ npm install
```

## Running the app

- create `MongoDB` cluster
- set `URL` attribute in `.env` file whish is the url of mongodb cluster connection
- run the following commands:

```bash
# migrate and seed database with admin account
$ npx typeorm-ts-node-commonjs -d src/database/data-source.ts migration:run

# the admin account credential are:
# email: system@darsoft.com
# password: 12345678

# development
$ npm run start
```

## Testing

- add the postman collection `server end points.postman_collection.json` to postman
- create `socket.io` request in postman with event listener `last-news-change`
- press connect and watch the incoming messages when news are modified (create - update - delete news)
- Swagger APIs Documentation url: `http://localhost:3000/api`

## Note

when login take the `access-token` from `response` and put it in variable called `access-token` in `global variables` in postman

## Development team

Lubna Alhindy
