## Exemplo de uso da API da Google

* Ionic 3
* API Firebase 2

Este exemplo implementa autenticação com o Google Firebase API.
Clone em sua máquina e utilize o comando npm install para instalar as dependências necessárias.

Para usar a API Firebase, é necessário criar um projeto através do [console](https://console.firebase.google.com/) de projetos da ferramenta.

Antes de rodar a aplicação, é necessário alterar o arquivo app<span></span>.firebase.config.ts da pasta app com as propriedades disponibilizadas pelo firebase. No console, clique em "Adicionar o Firebase ao seu aplicativo da Web". Será exibida a configuração que aponta para o seu projeto. Substitua no arquivo citado.

Na guia "Authentication", não esqueça de habilitar o provedor do método de login para "E-mail/senha".

Caso necessário, atualize as versões das dependências:

```
// Verificar as últimas atualizações
> npm outdated

// Atualizar
> npm update
```

![Telas](https://raw.githubusercontent.com/andynhofm/ionic-Authentication/master/resources/telas.png)
