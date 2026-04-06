class ManageMembers {

  getBoardMembers(boardId) {

    let call = new ApiCall();
    let url = `https://api.trello.com/1/boards/${boardId}/members`;
    let cards = call.getApi(url);
    return cards;

  }

  getMemberById(id) {
    let call = new ApiCall();
    let url = `https://api.trello.com/1/members/${id}`;
    let member = call.getApi(url);
    return member;
  }

  findMemberByEmail(boardId, email) {

    let members = getAllMembers(boardId);
    let canvasUser = CanvasAPILibrary.findUserByEmail(email);
    let user = members.find(user => user.fullName == canvasUser.name);

    return user;

  }

  addMemberToCard(cardId, memberId) {

    let call = new ApiCallPOST();
    let url = `https://api.trello.com/1/cards/${cardId}/idMembers`;
    let payload = {value : memberId};
    let member = call.postApi(url, payload);
    return member;

  }

  removeMemberFromCard(cardId, memberId) {
    let call = new ApiCallDELETE();
    let url = `https://api.trello.com/1/cards/${cardId}/idMembers/${memberId}`;
    let remove = call.delApi(url);
    return remove;
  }

  inviteMemberToBoard(boardId, email, role) {

    let call = new ApiCallPUT();
    let url = `https://api.trello.com/1/boards/${boardId}/members?email=${email}`;
    let invite = call.putApi(url, {type : role});
    return invite;

  }

}

function getAllMembers(boardId) {

  let member = new ManageMembers();

  let allMembers = member.getBoardMembers(boardId);

  return allMembers;

}

function findMemberByEmail(boardId, email) {

  let members = new ManageMembers();

  let member = members.findMemberByEmail(boardId, email);

  return member;

}

function getMemberById(memberId) {
  let members = new ManageMembers();
  let member = members.getMemberById(memberId);
  return member;
}

function addMemberToCard(cardId, memberId) {
  let members = new ManageMembers();
  let add = members.addMemberToCard(cardId, memberId)
  return add;
}

function removeMemberFromCard(cardId, memberId) {
  let members = new ManageMembers();
  let remove = members.removeMemberFromCard(cardId, memberId);
  return remove;
}

function inviteMemberToBoard(boardId, email, role) {
  let members = new ManageMembers();
  let invite = members.inviteMemberToBoard(boardId, email, role);
  return invite;
}