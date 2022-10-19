#!/bin/bash

docker exec -it budget-app sh -c "cd /usr/src && npm run migrations:run && npm run seed:run"
