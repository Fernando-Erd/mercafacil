
# Teste MercaFácil

## Execução

```bash
docker-compose up
```

Observação: As tabelas são criadas ao subir o docker.

## Funcionamento

#### Autenticação
Para o usuário autenticar é necessário mandar um *post* para o seguinte endereço: http://localhost:80/login

Os parâmetros que devem ser mandados no body para o logar com cada usuário é:

Usuário Varejão
```json
{
	"user": "Varejão",
	"password": "123mudar"
}
```
Usuário Macapá
```json
{
	"user": "Macapá",
	"password": "123"
}
```
Após isso, a rota ira retornar um json contendo autorização e um token de autenticação para o usuário, como por exemplo:

```json
{
   "auth":true,
   "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjE0NDY2MzUzLCJleHAiOjE2MTQ0NjY2NTN9._mw--N4Mbtb-yvuLIKR3CMjj4CvUoTEdDogp0Iz2cJU"
}
```

Esse token é válido por 5 minutos, após isso o usuário necessita realizar login novamente na plataforma.

#### Inserção no banco de dados
Com o token em mãos é necessário criar um campo no *header* do *postman* chamado **x-access-token** e no campo de  **value** deve ser colocado o token gerado para o usuário.

Para adicionar um novo conjunto de clientes o usuário necessita acessar o seguinte endereço: http://localhost:80/add_clientes e no body da requisição deve conter um *json* no seguinte formato:

```json
{
   "contacts":[
      {
         "name":"Joãozinho",
         "cellphone":"5541923456789"
      },
      {
         "name":"Terezinha",
         "cellphone":"5541923456788"
      }
   ]
}
```
Se a inserção for realizada com sucesso o sistema terá como resposta  para o usuário, **Inserido com sucesso no banco MySQL!!!** ou **Inserido com sucesso no banco Postgress!!!**

## Verificação da Inserção

Para verificar se a inserção foi inserida com sucesso basta entrar em cada máquina docker e executar um **select \*** em cada banco.

#### Verificar banco MySQL

Entrar no contêiner
```bash
docker exec -it mercafacil_mysql_1 /bin/sh
```

Após isso, deve entrar no banco do mysql com o seguinte comando

```bash
mysql -u api -p api
```
A senha do banco é **api**.

Por último executar o select
```sql
select * from contacts;
```

#### Verificar banco Postgress

Entrar no contêiner
```bash
docker exec -it mercafacil_postgresql_1 /bin/sh
```

Após isso, deve entrar no banco do postgress com o seguinte comando

```bash
psql --user admin --db api
```
Por último executar o select
```sql
select * from contacts;
```
