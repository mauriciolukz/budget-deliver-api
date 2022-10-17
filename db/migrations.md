```bash
> docker-compose up --build -d
> docker exec -it budget-deliver-api_mssql_1 bash
> /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P MyStr0ng@password
1> use budg;
2> go
1> delete migrations where name = 'seedVehicles1665626379642'
2> go
# salir de la consola mssql
1> quit
# salir del contenedor
> exit

> ./db/run-migrations.sh
```

curl -X 'POST' \
  'http://localhost:3000/api/vehicles/1/accesories' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJzdWIiOjEsImlhdCI6MTY2NTk2NDAwM30.FQBsLOSLD_f1fgEXX4IXr71LBCtOId7W41J9i1F9ids' \
  -H 'Content-Type: application/json' \
  -d '{
  "items": [[29,2,4], [31,2]]
}'
