<h3>Explicações Sobre a aplicação</h3>
<p>A aplicação é um CRUD de usuários com duas operações principais: Criar o usuário e Login no banco de dados. Todas as informações devem ser salvas no MongoDB e o usuário criado deve conter os seguintes dados: <strong>“id”, “name”, “password”</strong>
</p>

<h3>Regras de Negócio - Linhas Gerais</h3>

- [ ] Deve ser possível criar o usuário no banco de dados. ✔
- [ ] Não será possível criar um novo usuário com mesmo email e nome. ✔
- [ ] A senha deverá ser criptografada, preferencialmente usando <strong>“bcrypt”</strong> module. 
- [ ] A senha no banco deve vir com salt. <a href="https://pt.stackoverflow.com/questions/185058/o-que-%C3%A9-salt-quando-se-trata-de-criptografia-de-senhas">Ver mais sobre</a> ✔

- [ ] Todas as operações de um CRUD devem estar contidas no código (create, read, update and delete)
- [ ] Na visualização de registros no banco, deve conter dois métodos: geral (mostrar todos) e id (mostrar por id) ✔
- [ ] O ID deve ser gerado de forma aleatória ✔

- [ ] Ao criar o usuário, a exigência é que a senha deverá ter mais do que 8 caracteres.
   Senhas menores deveran retornar o <strong>status code: 400 - Invalid Request.</strong> ✔

- [ ] Ao criar o usuário, todos os campos devem ser preenchidos. Caso não, retornar o <strong>status code: 400 - Invalid Request.</strong> ✔.

- [ ] O usuário deve ser capaz de se logar. Os dados requeridos são email e password, e casa haja de erro de um ou de ambos deverá ser retornado  o <strong>status code: 400 - Invalid Request.</strong> ✔

- [ ] <strong>Seria interessante, mas não obrigatório adição de testes nos controllers com o Jest...</strong>

<h3>Tecnlogias e ferramentas usadas</h3>

<ul>
  <li>Node v.20.12.1</li>
  <li>TypeScript 5.5.3</li>
  <li>Nodemon 3.1.4</li>
  <li>Express 4.19.2</li>
  <li>Jest 29.7.0</li>
  <li>Insomnia</li>
</ul>

## Para rodar localmente o projeto, siga as instruções abaixo.

Clone o projeto

```bash
  git clone https://github.com/samuelribeiroo/lab-node.git
```

Inicialize o repositório 

```bash
  cd users-api
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm start
```
