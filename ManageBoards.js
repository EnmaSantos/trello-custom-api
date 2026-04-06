class ManageBoards {

  getAllBoardInfo(boardId) {

    let call = new ApiCall();
    let url = `https://api.trello.com/1/boards/${boardId}?fields=all&lists=all&cards=all&card_fields=all&card_attachments=true&labels=all&members=all&checklists=all&customFields=true&card_customFieldItems=true`;
    let cards = call.getApi(url);
    return cards;

  }

  createBoard(boardPayload) {

    let call = new ApiCallPOST();
    let url = `https://api.trello.com/1/boards`
    let board = call.postApi(url, boardPayload);
    return board;

  }

}

function getAllBoardInfo(boardId) {

  let boards = new ManageBoards();
  let board = boards.getAllBoardInfo(boardId)
  return board;

}

function createBoard(boardPayload) {
  let boards = new ManageBoards();
  let board = boards.createBoard(boardPayload);
  return board;
}