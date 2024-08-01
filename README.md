<h3>Regras de Negócio - Linhas Gerais</h3>

- [ ] Deve ser possível criar o usuário no banco de dados. ✔
- [ ] Não será possível criar um novo usuário com mesmo email. ✔
- [ ] A senha deverá ser criptografada, preferencialmente usando <strong>“bcrypt”</strong> module. 
- [ ] A senha no banco deve vir com salt. <a href="https://pt.stackoverflow.com/questions/185058/o-que-%C3%A9-salt-quando-se-trata-de-criptografia-de-senhas">Ver mais sobre</a> ✔

- [ ] Todas as operações de um CRUD devem contidas no código (create, read, update and delete)
- [ ] Na visualização de registros no banco, deve conter dois métodos: geral (mostrar todos) e id (mostrar por id) ✔

- [ ] Ao criar o usuário, a exigência é que a senha deverá ter mais do que 8 caracteres.
   Senhas menores deveran retornar o <strong>status code: 400 - Invalid Request.</strong> ✔

- [ ] O usuário deve ser capaz de se logar. Os dados requeridos são email e password, e casa haja de erro de um ou de ambos deverá ser retornado  o <strong>status code: 400 - Invalid Request.</strong> ✔