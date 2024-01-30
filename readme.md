# Run Redis Stack on Docker

How to install Redis Stack using Docker

## To get started with Redis Stack using Docker, you first need to select a Docker image

1. **redis/redis-stack** contains both Redis Stack server and RedisInsight. This container is best for local development because you can use the embedded RedisInsight to visualize your data.

2. **redis/redis-stack-server** provides Redis Stack server only. This container is best for production deployment.

## Getting started

### redis/redis-stack-server

To start Redis Stack server using the redis-stack-server image, run the following command in your terminal:

`docker run -d --name redis-stack-server -p 6379:6379 redis/redis-stack-server:latest`

### redis/redis-stack

To start a Redis Stack container using the redis-stack image, run the following command in your terminal:

`docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest`

The **docker** run command above also exposes RedisInsight on port 8001. You can use RedisInsight by pointing your browser to **localhost:8001**.
