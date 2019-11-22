# Admin

````shell
skaffold build -p dev
docker build . -t test --target prod --build-arg DEPLOY_URL=http://localhost:2002/
````

