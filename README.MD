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

In order to stop containers:
```shell
    docker compose -f docker-compose-dev.yml down
```

To run specific service use first command with added service name like this:
```shell
    docker compose -f docker-compose-dev.yml up {service name} -d
```
List of services with env variables to configure your instance:
- dev-db - database intended for development
- To clear database please:
  - stop db container
  - delete folder postgres_data 
  - start db container
  
  | Variable name       |              Description               | Default value |
  |---------------------|----------------------------------------|---------------|
  | `DATABASE_USER`     | Will create specific user in postgres  | `postgres`    |
  | `DATABASE_PASSWORD` | Will set password of created user      | `123`         |
  | `DATABASE_NAME`     | Name of db created in postgres         | `nest`        |

- dev-db-seed - seed database with test data
  
  | Variable name       |              Description               | Default value |
  |---------------------|----------------------------------------|---------------|
  | `DATABASE_HOST`     | hostname of postgres                   | `dev-db`      |
  | `DATABASE_PORT`     | port with postgres instance running    | `5432`        |               
  | `DATABASE_USER`     | what user use to login                 | `postgres`    |              
  | `DATABASE_PASSWORD` | what password use to login             | `123`         |             
  | `DATABASE_NAME`     | which db to query                      | `nest`        |  
- initiatives-dev-api - this will start be 
  - prisma studio is running on port 5555
  - in dev mode api is on /api/ route
  
  | Variable name       |              Description               | Default value |
  |---------------------|----------------------------------------|---------------|
  | `DATABASE_HOST`     | hostname of postgres                   | `dev-db`      |
  | `DATABASE_PORT`     | port with postgres instance running    | `5432`        |             
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

## All default ports and services

Frontend [http://localhost:3000](localhost:3000)

Backend  [localhost:8080](localhost:8080)

Swagger  [localhost:8080/api](localhost:8080/api)

Prisma Studio  [localhost:5555](localhost:5555)

Dev postgresql [localhost:5432](localhost:5432) username postgres password 123

# Testing
By default e2e tests will be ran on default docker compose up command
You can modify it by:
 - Specifying initiatives-api-test-watch
   `docker compose -f docker-compose-dev.yml up -d initiatives-api-test-watch`
 - Specifying any other service(initiatives-api-test-watch is not dependency for any other services)