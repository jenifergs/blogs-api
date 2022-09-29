# Boas-vindas ao repositório do projeto API de Blogs!

<h2> Índice</h2>

* [Introdução](#intro)
* [Sobre o desenvolvimento](#sobre)
* [Diagrama ER e Entidades](#diagrama)
* [O que foi desenvolvido](#desen)
* [Tecnologias utilizadas](#tecnologias-utilizadas)
* [Desenvolvedores e demais contribuidores](#pessoas-envolvidas)
* [Conclusão](#conclusão)

<h2 id="intro">Introdução</h2>
<p>
Aqui você vai encontrar os detalhes de como foi estruturado o desenvolvimento do projeto seguindo arquitetura de software chamado de modelo baseado em camadas o qual irá possuir três camadas denominadas de Model, Service e Controller. Além do uso de JWT (JSON Web Token), para autenticação e autorização de usuário. Está detalhado cada rota criada, autenticações e validações de regras de negócio.
</p>
<br />

<details id="sobre">
  <summary><strong>👨‍💻 Sobre o desenvolvimento</strong></summary>

  Neste projeto foi desenvolvido uma API e um banco de dados para a produção de conteúdo para um blog! 

  Este projeto é uma aplicação em `Node.js` usando o pacote `sequelize` para fazer um `CRUD` de posts.

  1. Possui endpoints que estaão conectados ao banco de dados seguindo os princípios do REST;

  2. É necessário usuário e login, portanto trabalhado a **relação entre** `user` e `post`; 

  3. Foi necessário a utilização de categorias para os posts, trabalhando, assim, a **relação de** `posts` para `categories` e de `categories` para `posts`.

<br />
</details>

<br />

<details>
  <summary  id="diagrama"><strong>🎲 Diagrama ER e Entidades</strong></summary>

  #### Diagrama de Entidade-Relacionamento

  Para orientação na construção das tabelas através do ORM, foi utilizado o *DER* a seguir:

  ![DER](./public/der.png)

  ---

  #### Formato das entidades

  Neste projeto foi utilizado o `ORM Sequelize` para criar e atualizar o banco de dados. 

  A produção das migrations geraram:

  - Uma tabela chamada **users**, contendo dados com a seguinte estrutura:

    | id  | display_name    | email           | password | image                                                                                   |
    | --- | --------------- | --------------- | -------- | --------------------------------------------------------------------------------------- |
    | 1   | Brett Wiltshire | brett@email.com // tem quer ser único | 123456   | http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png |

  - Uma tabela chamada **categories**, contendo dados com a seguinte estrutura:

    | id  | name |
    | --- | ---- |
    | 18  | News |

  - Uma tabela chamada **blog_posts**, contendo dados com a seguinte estrutura:

    | id  | title                      | content                                                | user_id | published                | updated                  |
    | --- | -------------------------- | ------------------------------------------------------ | ------- | ------------------------ | ------------------------ |
    | 21  | Latest updates, August 1st | The whole text for the blog post goes here in this key | 14  // Chave estrangeira, referenciando o id de `users`    | 2011-08-01T19:58:00.000Z | 2011-08-01T19:58:51.947Z |


  - Uma tabela chamada **PostCategories**, contendo uma **chave primária composta** utilizando os dois atributos da estrutura:

    | post_id | category_id |
    | ------- | ----------- |
    | 50 // Chave primária e estrangeira, referenciando o id de `BlogPosts`     | 20  // Chave primária e estrangeira, referenciando o id de `Categories`     |


    *Os dados acima são fictícios, e estão aqui apenas como exemplo*

    ---

<br />
</details>

<br />

<h3 id="desen">O que foi desenvolvido:</h3>

## 1 - Criação de migrations para as tabelas `users`, `categories`, `blog_posts`, `posts_categories`: 

- As `migrations` respeitam o _diagrama de Entidade-Relacionamento_ e o _formato das entidades_, como descrito na seção de [Diagrama ER e Entidades](#diagrama).
- Todas as tabelas e colunas devem estão em `snake_case` 

---

## 2 - Criação de models `User`, `Category`, `BlogPost`, `PostCategory`,  em `src/models` possui:

- A `model` respeita o _diagrama de Entidade-Relacionamento_ e o _formato das entidades_, como descrito na seção de [Diagrama ER e Entidades](#diagrama);
- As propriedades podem estar em `camelCase` se `underscored` for `true`. Ou seja, quando os dados forem inseridos ou selecionados via `model` devem estar em `camelCase`, mas quando as _queries_ forem pra o banco os campos das colunas devem estar em `snake_case`.
- A `model` foi desenvolvida em formato funcional.

---

## 3 - A aplicação possui o endpoint POST `/login`

- O endpoint é acessível através do URL `/login`;
- O corpo da requisição deverá seguir o formato abaixo:
  ```json
  {
    "email": "lewishamilton@gmail.com",
    "password": "123456"
  }
  ```

<details>
  <summary><strong>Validações para este endpoint: </strong></summary>

  * **[Será validado que não é possível fazer login sem todos os campos preenchidos]**
    - Se a requisição não tiver todos os campos devidamente preenchidos(não pode haver campos em branco), o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`:
    ```json
    {
      "message": "Some required fields are missing"
    }
    ```

  * **[Será validado que não é possível fazer login com um usuário que não existe]**
    - Se a requisição receber um par de `email` e `password` errados/inexistentes, o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`:
    ```json
    {
      "message": "Invalid fields"
    }
    ```
  
  * **[Será validado que é possível fazer login com sucesso]**
    - Se o login foi feito com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`:
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo1LCJkaXNwbGF5TmFtZSI6InVzdWFyaW8gZGUgdGVzdGUiLCJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImltYWdlIjoibnVsbCJ9LCJpYXQiOjE2MjAyNDQxODcsImV4cCI6MTYyMDY3NjE4N30.Roc4byj6mYakYqd9LTCozU1hd9k_Vw5IWKGL4hcCVG8"
    }
    ```
    > :warning: O token anterior é fictício, seu token deve ser gerado a partir da variável de ambiente `JWT_SECRET`, do `payload` da requisição e não contém o atributo `password` em sua construção.

<br />
</details>

---

## 4 - A aplicação possui o endpoint POST `/user`

- O endpoint é acessível através do URL `/user`;
- O endpoint é capaz de adicionar um novo `user` à tabela no banco de dados;
- O corpo da requisição deverá seguir o formato abaixo:
  ```json
  {
    "displayName": "Brett Wiltshire",
    "email": "brett@email.com",
    "password": "123456",
    "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
    // a imagem não é obrigatória
  }
  ```

<details>
  <summary><strong>Validações para este endpoint:</strong></summary>

  * **[Será validado que não é possível cadastrar com o campo `displayName` menor que 8 caracteres]**
    - Se a requisição não tiver o campo `displayName` devidamente preenchido com 8 caracteres ou mais, o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`:
    ```json
    {
      "message": "\"displayName\" length must be at least 8 characters long"
    }
    ```
  
  * **[Será validado que não é possível cadastrar com o campo `email` com formato inválido]**
    - Se a requisição não tiver o campo `email` devidamente preenchido com o formato `<prefixo@dominio>`, o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`:
    ```json
    {
      "message": "\"email\" must be a valid email"
    }
    ```

  * **[Será validado que não é possível cadastrar com o campo `password` menor que 6 caracteres]**
    - Se a requisição não tiver o campo `password` devidamente preenchido com 6 caracteres ou mais, o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`:
    ```json
    {
      "message": "\"password\" length must be at least 6 characters long"
    }
    ```

  * **[Será validado que não é possível cadastrar com um email já existente]**
    - Se a requisição enviar o campo `email` com um email que já existe, o resultado retornado deverá ser conforme exibido abaixo, com um status http `409`:
    ```json
    {
      "message": "User already registered"
    }
    ```
  
  * **[Será validado que é possível cadastrar um pessoa usuária com sucesso]**
    - Se o user for criado com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `201`:
    ```json
      {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo1LCJkaXNwbGF5TmFtZSI6InVzdWFyaW8gZGUgdGVzdGUiLCJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImltYWdlIjoibnVsbCJ9LCJpYXQiOjE2MjAyNDQxODcsImV4cCI6MTYyMDY3NjE4N30.Roc4byj6mYakYqd9LTCozU1hd9k_Vw5IWKGL4hcCVG8"
      }
      ```
    > :warning: O token anterior é fictício, seu token deve ser gerado a partir da variável de ambiente `JWT_SECRET`, do `payload` da requisição e não contém o atributo `password` em sua construção.

<br />
</details>

---

<details>
  <summary id="validandoToken"><strong>Os seguintes pontos serão avaliados</strong></summary>

  * **[Será validado que não é possível fazer uma operação sem o token na requisição]**
    - Se o token for inexistente o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`:
    ```json
    {
      "message": "Token not found"
    }
    ```

  * **[Será validado que não é possível fazer uma operação com o token inválido]**
    - Se o token for inválido o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`:
    ```json
    {
      "message": "Expired or invalid token"
    }
    ```

</details>

---

## 5 - A aplicação possui o endpoint GET `/user`

- É feita a validação do token para esta rota;
- O endpoint é acessível através do URL `/user`;
- O endpoint é capaz de trazer todos `users` do banco de dados;

<details>
  <summary><strong>Validações para este endpoint:</strong></summary>

  * **[Será validado que é possível listar todos os usuários]**
    - Ao listar usuários com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`:
    ```json
    [
      {
          "id": 1,
          "displayName": "Lewis Hamilton",
          "email": "lewishamilton@gmail.com",
          "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
      },

      /* ... */
    ]
    ```

<br />
</details>

---

## 6 - A aplicação possui o endpoint GET `/user/:id`

- É feita a validação do token para esta rota;
- O endpoint é acessível através do URL `/user/:id`;
- O endpoint é capaz de trazer o `user` baseado no `id` do banco de dados se ele existir;

<details>
  <summary><strong>Validações para este endpoint:</strong></summary>

  * **[Será validado que é possível listar um usuário específico com sucesso]**
    - Ao listar um usuário com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`:
    ```json
    {
      "id": 1,
      "displayName": "Lewis Hamilton",
      "email": "lewishamilton@gmail.com",
      "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
    }
    ```

  * **[Será validado que não é possível listar um usuário inexistente]**
    - Se o usuário for inexistente o resultado retornado deverá ser conforme exibido abaixo, com um status http `404`:
    ```json
    {
      "message": "User does not exist"
    }
    ```

<br />
</details>

---
## 7 - A aplicação possui o endpoint POST `/categories`

- É feita a validação do token para esta rota;
- O endpoint é acessível através do URL `/categories`;
- O endpoint é capaz de adicionar uma nova categoria à tabela no banco de dados;
- O corpo da requisição deverá seguir o formato abaixo:
  ```json
  {
    "name": "Typescript"
  }
  ```

<details>
  <summary><strong>Validações para este endpoint:s</strong></summary>

  * **[Será validado que não é possível cadastrar uma categoria sem o campo `name`]**
    - Se a requisição não tiver o campo `name` devidamente preenchidos(não pode haver campo em branco), o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`:
    ```json
    {
      "message": "\"name\" is required"
    }
    ```

  * **[Será validado que é possível cadastrar uma categoria com sucesso]**
    - Se a categoria for criada com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `201`:
    ```json
    {
      "id": 3,
      "name": "Typescript"
    }
    ```

<br />
</details>

---

## 8 - A aplicação possui o endpoint GET `/categories`

- É feita a validação do token para esta rota;
- O endpoint é acessível através do URL `/categories`;
- O endpoint é capaz de trazer todas categorias do banco de dados;

<details>
  <summary><strong>Validações para este endpoint:</strong></summary>

  * **[Será validado que é possível listar todas as categoria com sucesso]**
    - Ao listar categorias com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`:
    ```json
    [
      {
          "id": 1,
          "name": "Inovação"
      },
      {
          "id": 2,
          "name": "Escola"
      },

      /* ... */
    ]
    ```

<br />
</details>

---

## 9 - A aplicação possui o endpoint POST `/post`

- É feita a validação do token para esta rota;
- O endpoint é através do URL `/post`;
- O endpoint é capaz de adicionar um novo blog post e vinculá-lo às categorias em suas tabelas no banco de dados;
- O corpo da requisição deverá seguir o formato abaixo:
  ```json
  {
    "title": "Latest updates, August 1st",
    "content": "The whole text for the blog post goes here in this key",
    "categoryIds": [1, 2]
  }
  ```

<details>
  <summary><strong>Validações para este endpoint:</strong></summary>

  * **[Será validado que não é possível cadastrar sem todos os campos preenchidos]**
    - Se a requisição não tiver todos os campos devidamente preenchidos(não pode haver campos em branco), o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`:
    ```json
    {
      "message": "Some required fields are missing"
    }
    ```

  * **[Será validado que não é possível cadastrar um blog_post com uma `categoryIds` inexistente]**
    - Se a requisição não tiver o campo `categoryIds` devidamente preenchido com um array com pelo menos uma categoria que exista, o resultado retornado deverá ser conforme exibido abaixo, com um status http `400``:
    ```json
    {
      "message": "\"categoryIds\" not found"
    }
    ```

  * **[Será validado que é possível cadastrar um blog_post com sucesso]**
  - Se o blog post for criado com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `201`:
  ```json
  {
    "id": 3,
    "title": "Latest updates, August 1st",
    "content": "The whole text for the blog post goes here in this key",
    "userId": 1,
    "updated": "2022-05-18T18:00:01.196Z",
    "published": "2022-05-18T18:00:01.196Z"
  }
  ```

<br />
</details>

---

## 10 - Sua aplicação deve ter o endpoint GET `/post`

- É feita a validação do token para esta rota;
- O endpoint é acessível através do URL `/post`;
- O endpoint deve ser capaz de trazer todos os blogs post, user dono dele e as categorias do banco de dados;

<details>
  <summary><strong>Validações para este endpoint:</strong></summary>

  * **[Será validado que é possível listar blogpost com sucesso]**
    - Ao listar posts com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`:
    ```json
    [
      {
        "id": 1,
        "title": "Post do Ano",
        "content": "Melhor post do ano",
        "userId": 1,
        "published": "2011-08-01T19:58:00.000Z",
        "updated": "2011-08-01T19:58:51.000Z",
        "user": {
          "id": 1,
          "displayName": "Lewis Hamilton",
          "email": "lewishamilton@gmail.com",
          "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
        },
        "categories": [
          {
            "id": 1,
            "name": "Inovação"
          }
        ]
      },
      
      /* ... */
    ]
    ```

<br />
</details>

---

## 11 - Sua aplicação deve ter o endpoint GET `/post/:id`

- É feita a validação do token para esta rota;
- O endpoint é acessível através do URL `/post/:id`;
- O endpoint é capaz de trazer o blog post baseado no `id` do banco de dados se ele existir;

<details>
  <summary><strong>Validações para este endpoint:</strong></summary>

  * **[Será validado que é possível listar um blogpost com sucesso]**
    - Ao listar um post com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`:
    ```json
    {
      "id": 1,
      "title": "Post do Ano",
      "content": "Melhor post do ano",
      "userId": 1,
      "published": "2011-08-01T19:58:00.000Z",
      "updated": "2011-08-01T19:58:51.000Z",
      "user": {
          "id": 1,
          "displayName": "Lewis Hamilton",
          "email": "lewishamilton@gmail.com",
          "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
      },
      "categories": [
          {
              "id": 1,
              "name": "Inovação"
          }
      ]
    }
    ```

  * **[Será validado que não é possível listar um blogpost inexistente]**
    - Se o post for inexistente o resultado retornado deverá ser conforme exibido abaixo, com um status http `404`:
    ```json
    {
      "message": "Post does not exist"
    }
    ```

<br />
</details>

---

## 12 - Sua aplicação deve ter o endpoint PUT `/post/:id`

- É feita a validação do token para esta rota;
- O endpoint é acessível através do URL `/post/:id`;
- O endpoint é capaz de alterar um post do banco de dados, se ele existir;
- A aplicação só permite a alteração de um blog post caso a pessoa seja dona dele;
- A aplicação não permite a alteração das categorias do post, somente os atributos `title` e `content` podem ser alterados;
- O corpo da requisição segue o formato abaixo:
  ```json
  {
    "title": "Latest updates, August 1st",
    "content": "The whole text for the blog post goes here in this key"
  }
  ```
  

<details>
  <summary><strong>Validações para este endpoint:</strong></summary>

  * ☝ **[Será validado o token, como descrito na seção de [Validando token nas requisições](#validandoToken)]**

  * **[Será validado que não é possível editar um blogpost com outro usuário]**
    - Somente o user que criou o blog post poderá editá-lo, o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`
    ```json
      {
        "message": "Unauthorized user"
      }
    ```

  * **[Será validado que não é possível editar sem todos os campos preenchidos]**
    - Se a requisição não tiver todos os campos devidamente preenchidos(não pode haver campos em branco), o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`:
    ```json
    {
      "message": "Some required fields are missing"
    }
    ```

  * **[Será validado que é possível editar um blogpost com sucesso]**
    - Se o blog post for alterado com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`:
    ```json
    {
      "id": 3,
      "title": "Latest updates, August 1st",
      "content": "The whole text for the blog post goes here in this key",
      "userId": 1,
      "published": "2022-05-18T18:00:01.000Z",
      "updated": "2022-05-18T18:07:32.000Z",
      "user": {
        "id": 1,
        "displayName": "Lewis Hamilton",
        "email": "lewishamilton@gmail.com",
        "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
      },
      "categories": [
        {
          "id": 1,
          "name": "Inovação"
        },
        {
          "id": 2,
          "name": "Escola"
        }
      ]
    }
    ```

<br />
</details>

---

## 13 - Sua aplicação deve ter o endpoint DELETE `/post/:id`

- É feita a validação do token para esta rota;
- O endpoint é acessível através do URL `/post/:id`;
- O endpoint é capaz de deletar um blog post baseado no `id` do banco de dados se ele existir;
- A aplicação só permite a deleção de um blog post caso a pessoa seja dona dele;

<details>
  <summary><strong>Validações para este endpoint:</strong></summary>

  * **[Será validado que não é possível deletar um blogpost com outro usuário]**
    - Somente o user que criou o blog post poderá deletá-lo, o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`
    ```json
      {
        "message": "Unauthorized user"
      }
    ```

  * **[Será validado que é possível deletar um blogpost com sucesso]**
    - Se o blog post for deletado com sucesso não deve ser retornada nenhuma resposta, apenas um status http `204`:

  * **[Será validado que não é possível deletar um blogpost inexistente]**
    - Se o post for inexistente o resultado retornado deverá ser conforme exibido abaixo, com um status http `404`:
    ```json
    {
      "message": "Post does not exist"
    }
    ```

<br />
</details>

---

## 14 - Sua aplicação deve ter o endpoint DELETE `/user/me`

- É feita a validação do token para esta rota;
- O endpoint é acessível através do URL `/user/me`;
- O endpoint é capaz de deletar você do banco de dados, baseado no `id` que esta dentro do seu `token`;
- Aa aplicação deve ser capaz de utilizar o token de autenticação nos headers, para saber o user logado correspondente á ser apagado;

<details>
  <summary><strong>Validações para este endpoint:</strong></summary>

  * **[Será validado que é possível excluir meu usuário com sucesso]**
    - Se o user for deletado com sucesso não deve ser retornada nenhuma resposta, apenas um status http `204`:

<br />
</details>

---

## 15 - Sua aplicação deve ter o endpoint GET `/post/search?q=:searchTerm`

- É feita a validação do token para esta rota;
- O endpoint é acessível através do URL `/post/search`;
- O endpoint é capaz de trazer os blogs post baseados no `q` do banco de dados, se ele existir;
- A aplicação é capaz de retornar um array de blogs post que contenham em seu título ou conteúdo o termo passado na URL;
- A aplicação é capaz de retornar um array vázio caso nenhum blog post satisfaça a busca;
- O query params da requisição deverá seguir o formato abaixo:
  ```js
    http://localhost:PORT/post/search?q=vamos
  ```

<details>
  <summary><strong>Validações para este endpoint:</strong></summary>

  * **[Será validado que é possível buscar um blogpost pelo `title`]**
    - Se a buscar for pelo `title` o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`:
    ```json
    // GET /post/search?q=Vamos que vamos

    [
      {
        "id": 2,
        "title": "Vamos que vamos",
        "content": "Foguete não tem ré",
        "userId": 1,
        "published": "2011-08-01T19:58:00.000Z",
        "updated": "2011-08-01T19:58:51.000Z",
        "user": {
          "id": 1,
          "displayName": "Lewis Hamilton",
          "email": "lewishamilton@gmail.com",
          "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
        },
        "categories": [
          {
            "id": 2,
            "name": "Escola"
          }
        ]
      }
    ]
    ```

  * **[Será validado que é possível buscar um blogpost pelo `content`]**
    - Se a buscar for pelo `content` o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`:
    ```json
      // GET /post/search?q=Foguete não tem ré

      [
        {
          "id": 2,
          "title": "Vamos que vamos",
          "content": "Foguete não tem ré",
          "userId": 1,
          "published": "2011-08-01T19:58:00.000Z",
          "updated": "2011-08-01T19:58:51.000Z",
          "user": {
            "id": 1,
            "displayName": "Lewis Hamilton",
            "email": "lewishamilton@gmail.com",
            "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
          },
          "categories": [
            {
              "id": 2,
              "name": "Escola"
            }
          ]
        }
      ]
    ```

  * **[Será validado que é possível buscar todos os blogpost quando passa a busca vazia]**
    - Se a buscar for vazia o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`:
    ```json
      // GET /post/search?q=

      [
        {
          "id": 1,
          "title": "Post do Ano",
          "content": "Melhor post do ano",
          "userId": 1,
          "published": "2011-08-01T19:58:00.000Z",
          "updated": "2011-08-01T19:58:51.000Z",
          "user": {
            "id": 1,
            "displayName": "Lewis Hamilton",
            "email": "lewishamilton@gmail.com",
            "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
          },
          "categories": [
            {
              "id": 1,
              "name": "Inovação"
            }
          ]
        },
        
        /* ... */
      ]
    ```

  * **[Será validado que é possível buscar um blogpost inexistente e retornar array vazio]**
    - Se a buscar um post inexistente o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`:
    ```json
      // GET /post/search?q=BATATA

      []
    ```
</details>

<h2 id="tecnologias-utilizadas">Tecnologias utilizadas</h2>

* `Javascript`
* `NodeJs`
* `JWT (JSON Web Token) `
* `MySql`
* `ORM sequelize`
* `Express`
* `Docker`
* `Arquitetura de software - MSC`


<h2 id="pessoas-envolvidas">Desenvolvedores e demais contribuidores</h2>

* <strong>Jenifer Gonçalves</strong> - Desenvolvedora Web;
* <strong>Trybe - Escola de ensino de programação</strong>;


<h2 id="conclusão">Conclusão</h2>

<p>Programar é um eterno aprendizado. Quanto mais se pratica, mais se melhora. Praticar conceitos de programação com coisas que se é apaixonado apimenta ainda mais a relação! Muitos aprendizados novos são adicionados a cada dia, fazendo com que este projeto já tenha valido a pena antes mesmo de ser concluído!</p>
