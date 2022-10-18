#!/bin/bash

docker exec -it mssql sh -c "cd /usr/src && npm run migrations:run && npm run seed:run"
