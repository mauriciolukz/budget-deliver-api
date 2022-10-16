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
