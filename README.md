## Variables de entorno.

Para agregar variables de entrono se hace necesario agregarlas a los siguietes archivos.
  - ```.env.template``` 
  - ```Dockerfile```
  - ```docker-compose.yml```
  - ```CI/CD Variables en GitLab```
  - ```gitlab-ci.yml```

En el archivo `.env.template`, solo debe contener la definicion de la variable, para mantener los valores en modo desarrollo se debe crear una copia de `.env.template` y renombrarlo a `.env` y en `.env` modificar las varibles para agegar el valor correspondiente.

<br/>

## Dockerizacion.

- ***Crear imagen de manera local y correr el servicio de frontend***
```
docker-compose --env-file .env up --build
```

## Documentacion de las libreiras utilizadas.

### App Framework - React/Vite

- https://vitejs.dev/

### Framework to UI - MUI

- https://mui.com/
- https://github.com/codedthemes/mantis-free-react-admin-template/

### App Handling Routes

- https://reactrouter.com/en/main

### Handling APP State

- https://redux-toolkit.js.org/

### Data Source - GraphQL

- https://graphql.org/graphql-js/graphql-clients/
- https://www.apollographql.com/docs/react/get-started

### Testing

- https://vitest.dev/
- https://testing-library.com
