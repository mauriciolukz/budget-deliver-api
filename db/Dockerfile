FROM mcr.microsoft.com/mssql/server:2017-latest

# Copy initialization scripts
COPY [".", "/usr/src/app"]

# Create app directory
WORKDIR /usr/src/app

# Set environment variables, not to have to write them with docker run command
# Note: make sure that your password matches what is in the run-initialization script
ENV MSSQL_SA_PASSWORD MyStr0ng@password
ENV ACCEPT_EULA Y
ENV MSSQL_PID Express

# Expose port 1433 in case accessing from other container
# Expose port externally from docker-compose.yml
EXPOSE 1433

# Run Microsoft SQl Server and initialization script (at the same time)
USER root
CMD [ "/bin/bash", "./entrypoint.sh" ]
# CMD [ "sh", "-c", "./entrypoint.sh" ]

USER mssql


