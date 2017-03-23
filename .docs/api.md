# NodeJS API

## Express

## API Endpoints

Server API listen on: `localhost:5000/api/v1/`

- [x] **GET - Fetch all todo items `/todos`**
- [x] **GET - Fetch all filters `/filters`**
- [x] **POST - Save new todo item `/todos`**:

request:
```json
{
  "text": "[TODO text]",
  "severity": "[TODO severity]"
}
```
response:
```json
{
  "[object TODO created]"
}
```
- [x] **PUT - Update todo item `/todos/:id`**:

request:
```json
{
  "[any prop, unless `id`]:": "[new value]"
}
```
response:
```json
{
  "[object TODO updated]"
}
```
- [x] **DELETE - Delete todo item `/todos/:id`**

response:
```json
{
  "id": "[int id TODO deleted]"
}
```

*Foi alterado a regra de negócio do app para que fosse
resolvida a criação do TODO item na API do server,
sendo assim, passado para na request no endpoint de
criação de novos TODO items apenas valores dinâmicos do DOM,
como `text` & `severity`.*
