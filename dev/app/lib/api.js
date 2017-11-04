const SERVER_ADDRESS = 'http://api.underwaterchess.com';
const STATUS_SUCCESS = 200;

function getMoveFromServer(fen, move) {
  const address = `${SERVER_ADDRESS}/game?fen=${fen}&move=${move}&format=json`;
  const xhrFetch = fetch(address, {
    method: 'GET',
  });

  const bestMove = xhrFetch
    .then((response) => {
      if (response.status !== STATUS_SUCCESS) {
        throw new Error(`Failed to load resource. Error code: ${response.status}`);
      }
      return response.json();
    })
    .then(data => data.turn.bestMove);

  return bestMove;
}


export default getMoveFromServer;
