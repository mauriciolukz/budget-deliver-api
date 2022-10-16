#!/bin/bash

docker exec -it budget-deliver-api_app_1 sh -c "cd /usr/src && npm run migrations:run && npm run seed:run"
