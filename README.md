To lauch the backend only you must have:
**Node.js18+**\
To launch the backend with docker-compose you must have **Docker** installed.

Env Variables:\
`ENABLE_LOGGING - if 'true', connects Winston to a MongoDB instance and stores the logs there as well`\
`STRATEGY - default strategy to be used by the app (ANY | ALL | customFunc)`


The project already has a destination mapping configured in the config.ts file.
To launch the project:
1. Make sure the **config.ts** file contains the correct destination mapping. After you build your image, it'll be bundled into it so you'll have to rebuild it to update it.
2. Make sure the env variables in the **docker-compose** file are correct.
3. From the repository folder run `docker build -t picos-homework .`
4. From the repository folder run `docker compose up -d`
5. Go to [localhost:3000](http://localhost:3000), if you see `Express + TypeScript Server` then the app is working.

Endpoint reference:
1. `GET /get-token` provides a dummy JWT token to use with the events endpoints.
2. `POST /events` accepts payloads of the IncomingEvent type defined in `src/types.ts`, processes them and prints out processing results.

You can export a postman collection from the postman-collection.example.json file or use your own. Make sure to obtain and enter a Bearer token for  the /events request.
