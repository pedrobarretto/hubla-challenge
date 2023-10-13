# hubla-challenge

![image](https://github.com/pedrobarretto/hubla-challenge/assets/61850145/554f9a69-7141-4b0c-9729-3d817921995b)


Olá! Esse repositório é a minha proposta de solução para o desafio técnico para vaga [Software Engineer Pleno](https://www.linkedin.com/jobs/view/3715823889/?refId=23d95301-8262-4880-bbc6-80ffdb2ed8e0&trackingId=fxjV8%2B5YRQC4NqIMMOvB%2Bg%3D%3D) na Hubla.

Esse repositório contém o código para o front-end e o back-end, esses foram feitos com a seguinte stack:

#### Front-end
- NextJS v13
- Typescript
- ChakraUI
- Jest

#### Back-end
- NestJS
- Typescript
- NodeJS
- Docker
- Docker Compose
- Postgres
- Swagger
- Jest

Para você conseguir rodar em sua máquina essa base de código, você pode seguir esse passo a passo:

#### Clonar o repositório
`git clone git@github.com:pedrobarretto/hubla-challenge.git`

#### Instalar as dependências nas pastas `server` e `client`

`cd server`
`npm install`

`cd client`
`npm install`

#### Após instalar as depandências, com 2 terminais, execute os comandos a seguir para rodar localmente o front-end e o back-end

Dentro da pasta `server`, execute o comando `docker compose up --build`

OBS: Caso você tenha o seguinte erro ao executar este comando, é porque a sua porta `5432`, porta padrão do postgres ao ser instalado, está em uso por algum serviço do postgres, para resolver, você pode seguir esse [tutorial do Stack Overflow](https://stackoverflow.com/questions/38249434/docker-postgres-failed-to-bind-tcp-0-0-0-05432-address-already-in-use)

- ![image](https://github.com/pedrobarretto/hubla-challenge/assets/61850145/5d68807e-9af5-4788-bd0c-1d77d5053f26)

Caso você consiga executar o comando do docker sem problemas, ou após resolver o erro mencionado, o back-end já está rodando localmente em sua máquina. Para acessar a documentação do back-end, você pode acessar a seguinte [url](https://localhost:8000/api), onde você vai conseguir ver todas as informações sobre os endpoints criados pelo Swagger.

Para executar o front-end, dentro da pasta `client`, em outro terminal, execute o comando `npm run dev`, e vá até a url [da aplicação next](https://localhost:3000).

Após tudo rodando locamente, você deverá conseguir acessar a aplicação sem problemas!

![image](https://github.com/pedrobarretto/hubla-challenge/assets/61850145/a1985b02-dba2-4396-8830-b99c75815fb3)

