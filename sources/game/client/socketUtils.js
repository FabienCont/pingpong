import io from 'socket.io-client';

let socketClient={};

const connectToGame=function(handler){
  var url = window.SERVER_URL?window.SERVER_URL:"http://localhost:3000";
  socketClient = io.connect(url);
  window.socket = socketClient;
};

const listenUpdateEntities=function(handler){
  socketClient.on('updateEntities', function (data) {
    handler(data);
  });
}

const onEndGameSesion=function(handler){
  socketClient.on('endGameSesion', function (data) {
    console.log("engGameSession");
    socketClient.close();
    handler(data);
  });
};

const onStartGameSession=function(handler){
  socketClient.on('startGameSession', function (data) {
    console.log("startGameSession");
    handler(data);
  });
};
const onPlayerSelected=function(handler){
  socketClient.on('playerSelected', function (data) {
    console.log("playerSelected",data);
    handler(data);
  });
};


const emitInputs=function(inputs){
  socketClient.emit('inputs',inputs);
  console.log("emit Inputs",inputs);
}

const emit=function(element){
  socketClient.emit('emit',element);
}

export {connectToGame,onStartGameSession,onPlayerSelected,listenUpdateEntities,emitInputs,emit,onEndGameSesion};
