#!/bin/bash

docker exec -it budget-app sh -c "cd /usr/src && npm run seed:revert && npm run migrations:revert"
