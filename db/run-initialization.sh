#!/usr/bin/env bash
sleep 20

# Run the setup script to create the DB and the schema in the DB
# Note: make sure that your password matches what is in the Dockerfile
# docker exec budget-deliver-api-mssql-1 sh -c "/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P MyStr0ng@password -d master -i create-database.sql"
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P MyStr0ng@password -d master -i create-database.sql


