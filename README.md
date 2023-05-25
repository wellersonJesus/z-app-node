## Exemplo de integração Whatsapp com NodeJs

Esse projeto possui exemplos de como se integrar com whatsapp utilizando o Z-API.

# Como rodar

1 - Instalar dependencias

```shell
npm install
```

2 - Configurar API no arquivo index.js.
Caso não tenha sua API, Crie sua conta em https://z-api.io e conecte sua instância a uma conta whatsapp para pegar a API.

```shell
const INSTANCE_API = `INSIRA_SUA_API_AQUI`
```

3 - Executar

```shell
npm start
```

# Dependencies

```bash
npm install
npm install axios@latest
npm install inquirer@latest
npm install dotenv
```

- model menssage

```bash
"Ok, sua opção (PEDIDOS DE CERTIDÃO) foi enviada com sucesso. Aguarde o atendimento.";

"📋 *Bem-vindo(a) ao menu de opções*:\n👇👇👇\n\n" +
"1 - CONSULTA ATOS\n" +
"2 - FIRMAS\n" +
"3 - ESCRITURAS E PROCURAÇÕES\n" +
"4 - PEDIDOS DE CERTIDÃO\n"
```
