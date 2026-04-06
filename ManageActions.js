class ManageActions {

  getBoardActions(boardId) {


    let call = new ApiCall();
    let url = `https://api.trello.com/1/boards/${boardId}/actions?limit=1000`;
    let cards = call.getApi(url);
    return cards.filter(action => action.data.card);;

  }

  getMemberActions(memberId) {

    let call = new ApiCall();
    let url = `https://api.trello.com/1/members/${memberId}/actions?limit=1000`;
    let actions = call.getApi(url);
    return actions.filter(action => action.data.card && action.idMemberCreator == memberId);

  }

  /**
   * Gets all actions associated with a specific Trello card
   * @param {string} cardId - The ID of the Trello card
   * @returns {Array} - Array of all actions for the card
   */
  getCardActions(cardId) {
    const call = new ApiCall();
    let allActions = [];
    let hasMore = true;
    let before = null;
    const limit = 1000; // Trello allows up to 1000 actions per request
    
    // List of all possible action types for comprehensive retrieval
    const actionTypes = [
      "addAttachmentToCard", "addChecklistToCard", "addMemberToCard",
      "commentCard", "convertToCardFromCheckItem", "copyCard",
      "createCard", "deleteAttachmentFromCard", "deleteCard",
      "emailCard", "moveCardFromBoard", "moveCardToBoard",
      "removeChecklistFromCard", "removeMemberFromCard", 
      "updateCard", "updateCardDueDate", "updateCheckItemStateOnCard", 
      "addLabelToCard","removeLabelFromCard"
    ];
    
    // Include all action types in the request
    const filter = actionTypes.join(",");
    
    while (hasMore) {
      // Build URL with proper pagination parameters and filter for all action types
      let url = `https://api.trello.com/1/cards/${cardId}/actions?limit=${limit}&filter=${filter}`;
      
      // Add the 'before' parameter for pagination if we have a previous response
      if (before) {
        url += `&before=${before}`;
      }
      
      // Make the API call
      const actions = call.getApi(url);
      
      // Check if we got valid results
      if (!actions || actions.length === 0) {
        hasMore = false;
        break;
      }
      
      // Add the actions to our collection
      allActions.push(...actions);
      
      // Set up pagination for the next request
      if (actions.length < limit) {
        // If we received fewer actions than the limit, we've reached the end
        hasMore = false;
      } else {
        // Get the ID of the last action for pagination
        before = actions[actions.length - 1].id;
      }
    }
    
    return allActions;
  }

  getMemberActionsByDates(memberId, start, end) {

    let call = new ApiCall();
    
    let actions = [];
    let moreActions = true;
    while (moreActions) {
      let url = `https://api.trello.com/1/members/${memberId}/actions?limit=1000&since=${start}&before=${end}`;
      let newActions = call.getApi(url);
      actions.push(...newActions);
      if (newActions.length == 1000) {
        start = newActions[newActions.length - 1].date;
      } else {
        moreActions = false;
      }

    }
    return actions.filter(action => action.data.card && action.idMemberCreator == memberId);

  }

  getCardCommentActions(cardId) {
    let call = new ApiCall();
    let url = `https://api.trello.com/1/cards/${cardId}/actions?`;
    let comments = call.getApi(url).filter(action => action.type == "commentCard");
    return comments;
  }

}

function getBoardActions(boardId) {
  let action = new ManageActions();
  let actions = action.getBoardActions(boardId);
  return actions;
} 

function getMemberActions(memberId) {
  let action = new ManageActions();
  let actions = action.getMemberActions(memberId);
  return actions;
}

function getCardActions(cardId) {
  let action = new ManageActions();
  let actions = action.getCardActions(cardId);
  return actions;
}

function getMemberActionsByDates(memberId, start, end) {
  let action = new ManageActions();
  let actions = action.getMemberActionsByDates(memberId, start, end);
  return actions;
}

function getCardComments(cardId) {
  let actions = new ManageActions();
  let comments = actions.getCardCommentActions(cardId);
  return comments;
}