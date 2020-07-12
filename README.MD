adb reverse tcp:3333 tcp:3333

# Desafio GoStack: Gomarketplace
Projeto desenvolvido durante a Semana 3 do bootcamp GoStack, construindo a aplicação Gomarketplace, explorando conceitos de React Native como:
- [x] React Hooks
- [x] Styled-components
- [x] Context-api
- [x] Componentização
- [x] Estado e imutabilidade

## ⚙ Pré-requisitos
Para a execução do projeto em seu ambiente local é necessário possuir instalado:

- NodeJS em sua versão LTS
> https://nodejs.org/en/

- Configurar o ambiente local mobile, seguindo os passos abaixo
> https://react-native.rocketseat.dev/

## 🛠 Guia de instalação do projeto
1. Faça download do projeto do github
2. Após ter feito download do projeto, acesse o diretorio raiz do mesmo via linha de comando
3. No terminal, execute o comando npm install para instalar as dependências do projeto (Caso você tenha o yarn instalado em sua máquina, execute apenas yarn para a instalação das dependencias)
4. Com o ambiente mobile configurado e com um emulador android/ios em execução, ou um device conectado via usb, execute o comando `react-native run-android` ou `react-native run-ios` para IOS. Caso você possua mais de um device conectado ou emulador em execução passe o nome do dispositivo no final dos comandos citados acima.

## 📃 Utilização do servidor moc
Para essa aplicação estamos utilizando o `json-server`, que simula uma API.
Para executa-la é necessário seguir as seguintes configurações configurando o emulador/device USB:

**Device Android**:
Execute o comando adb reverse tcp:3333 tcp:3333 e defina o valor da `baseURL`, no arquivo ./services/api.ts como `http://localhost:3333`

**Device IOS**:
Defina o valor da `baseURL`, no arquivo ./services/api.ts como `http://localhost:3333`

## 📋 Comandos disponíveis
* start: execução do app em seu device ou emulador após o bundle ter sido gerado
* test: execução dos testes validando o desenvolvimento do APP
* moc: execução do servidor moc localmente

## 📙 Enunciado
Todo o desafio foi realizado baseado no enunciado:
> https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/desafio-fundamentos-react-native
