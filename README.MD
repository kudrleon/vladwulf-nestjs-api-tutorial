## Development
To run dev version with hot reload use:
```shell
    docker compose -f docker-compose-dev.yml up -d
```
To see logs use:
```shell
    docker compose logs
```
If you want to see them real-time use:
```shell
    docker compose logs -f
```

To run specific service use first command with added service name like this:
```shell
    docker compose -f docker-compose-dev.yml up {service name} -d
```
List of services with env variables to configure your instance:
- dev-db - database intended for development
  |---------------------|----------------------------------------|---------------|
  | Variable name       |              Description               | Default value |
  |---------------------|----------------------------------------|---------------|
  | `DATABASE_USER`     | Will create specific user in postgres  | `postgres`    |
  | `DATABASE_PASSWORD` | Will set password of created user      | `123`         |
  | `DATABASE_NAME`     | Name of db created in postgres         | `nest`        |

- dev-db-seed - seed database with test data, pass env variable `FRESH_START=true` to have all existing data wiped
  
  | Variable name       |              Description               | Default value |
  |---------------------|----------------------------------------|---------------|
  | `DATABASE_HOST`     | hostname of postgres                   | `dev-db`      |
  | `DATABASE_PORT`     | port with postgres instance running    | `5434`        |               
  | `DATABASE_USER`     | what user use to login                 | `postgres`    |              
  | `DATABASE_PASSWORD` | what password use to login             | `123`         |             
  | `DATABASE_NAME`     | which db to query                      | `nest`        |  
- initiatives-dev-api - this will start be 
  
  | Variable name       |              Description               | Default value |
  |---------------------|----------------------------------------|---------------|
  | `DATABASE_HOST`     | hostname of postgres                   | `dev-db`      |
  | `DATABASE_PORT`     | port with postgres instance running    | `5434`        |             
  | `DATABASE_USER`     | what user use to login                 | `postgres`    |      
  | `DATABASE_PASSWORD` | what password use to login             | `123`         |     
  | `DATABASE_NAME`     | which db to query                      | `nest`        |   
  | `BE_API_PORT`       | to what port BE will be mapped on host | `8080`        |    
  |       ⬆ Warn: *WON'T* change port of nest app inside container              |
  | `JWT_SECRET`        | seed for JWT token                     | `super-secret`|

- initiatives-dev-client - this will start FE only

  | Variable name       |              Description               | Default value |
  |---------------------|----------------------------------------|---------------|
  | `BE_API_PORT`       | to what port BE will be mapped on host | `8080`        |   
  |       ⬆ Warn: *WON'T* change port of nest app inside container              |
  | `BE_API_HOST`       | url where BE is hosted                 | `localhost    |
  | `FE_PORT`           | Port on which to run dev client        | `3000`        |   
  | ⬆ Warn: this *WILL* change both exposed port and port of FE inside container|