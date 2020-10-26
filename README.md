# Prisma vs pg two queries one connection

This repo shows that Prisma's query tries to create a connection

## Setup:

- Setup 1 (`prisma.js`): Prisma with Postgres (max_connections=1)
- Setup 2 (`pg.js`):`pg` with Postgres (max_connections=1)
- Workload, we make one connection with each setup and run two "sleep 20" queries from the same connection. The queries are run async.

## To Reproduce:

- Run `docker-compose up -d`
- Run `node prisma.js`

Expected output:

```
connect
1st sleep 20 query sent async
2nd sleep 20 query sent async
1st query returned
2nd query returned
```

Actual output:

```
connect
1st sleep 20 query sent async
2nd sleep 20 query sent async
2nd query errored Error:
Invalid `prisma.executeRaw()` invocation:


  Error in connector: Error querying the database: db error: FATAL: sorry, too many clients already
1st query returned
```

Expected output doesn't match actual output. It seems like Prisma is treating the second query as a separate connection.

- Run `node pg.js` => It yields the expected output mentioned above
