#!/usr/bin/env bash
set -m
/usr/src/app/run-initialization.sh & /opt/mssql/bin/sqlservr
fg
