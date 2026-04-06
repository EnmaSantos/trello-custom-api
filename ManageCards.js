/**
 * Class ManageCards
 * 
 * This class provides methods to interact with Trello cards. It includes
 * functionality to retrieve, create, update, and manage card attachments.
 */
class ManageCards {

  /**
   * getCard
   * 
   * Retrieves a card by its ID from Trello.
   * 
   * @param {string} cardId - The ID of the card to retrieve.
   * @returns {Object|null} - The card object if found, otherwise null.
   */
  getCard(cardId) {
    let call = new ApiCall();
    let url = `https://api.trello.com/1/cards/${cardId}`;
    let card = call.getApi(url);
    return card;
  }

  /**
   * getCardsFromList
   * 
   * Retrieves all cards from a specified list.
   * 
   * @param {string} listId - The ID of the list to retrieve cards from.
   * @returns {Array|null} - An array of card objects if found, otherwise null.
   */
  getCardsFromList(listId) {
    let call = new ApiCall();
    let url = `https://api.trello.com/1/lists/${listId}/cards`;
    let cards = call.getApi(url);
    return cards;
  }

  /**
   * getAllCards
   * 
   * Retrieves all cards from a specified board.
   * 
   * @param {string} boardId - The ID of the board to retrieve cards from.
   * @returns {Array|null} - An array of card objects if found, otherwise null.
   */
  getAllCards(boardId) {
    let call = new ApiCall();
    let url = `https://api.trello.com/1/boards/${boardId}/cards`;
    let cards = call.getApi(url);
    return cards;
  }


  /**
   * getArchivedCards
   * 
   * Retrieves all cards from a specified board even the archived ones.
   * 
   * @param {string} boardId - The ID of the board to retrieve cards from.
   * @returns {Array|null} - An array of card objects if found, otherwise null.
   */

  getArchivedCards(boardId){
    let call = new ApiCall();
    let url = `https://api.trello.com/1/boards/${boardId}/cards/all`
    let cards = call.getApi(url);
    return cards;
  }

  /**
   * createCard
   * 
   * Creates a new card in a specified list.
   * 
   * @param {string} listId - The ID of the list where the card will be created.
   * @param {Object} options - The options for the new card (e.g., name, description).
   * @returns {Object|null} - The created card object if successful, otherwise null.
   */
  createCard(listId, options) {
    let call = new ApiCallPOST();
    let url = `https://api.trello.com/1/cards?idList=${listId}`;
    let card = call.postApi(url, options);
    return card;
  }

  /**
   * updateCard
   * 
   * Updates an existing card by its ID.
   * 
   * @param {string} cardId - The ID of the card to update.
   * @param {Object} options - The options for updating the card.
   * @returns {Object|null} - The updated card object if successful, otherwise null.
   */
  updateCard(cardId, options) {
    let call = new ApiCallPUT();
    let url = `https://api.trello.com/1/cards/${cardId}`;
    let update = call.putApi(url, options);
    return update;
  }

  /**
   * getCardAttachments
   * 
   * Retrieves all attachments from a specified card.
   * 
   * @param {string} cardId - The ID of the card to retrieve attachments from.
   * @returns {Array|null} - An array of attachment objects if found, otherwise null.
   */
  getCardAttachments(cardId) {
    let call = new ApiCall();
    let url = `https://api.trello.com/1/cards/${cardId}/attachments`;
    let attachments = call.getApi(url);
    return attachments;
  }

  /**
   * addAttachmentToCard
   * 
   * Adds an attachment to a specified card.
   * 
   * @param {string} cardId - The ID of the card to which the attachment will be added.
   * @param {Object} options - The options for the attachment (e.g., URL).
   * @returns {Object|null} - The created attachment object if successful, otherwise null.
   */
  addAttachmentToCard(cardId, options) {
    let call = new ApiCallPOST();
    let url = `https://api.trello.com/1/cards/${cardId}/attachments`;
    let attachment = call.postApi(url, options);
    return attachment;
  }

  deleteAttachmentFromCard(cardId, attatchmentId) {
    let call = new ApiCallDELETE();
    let url = `https://api.trello.com/1/cards/${cardId}/attachments/${attatchmentId}`;
    let attach = call.delApi(url);
    return attach;

  }

  /**
   * findCardByName
   * 
   * Searches for a card by name within a specified board.
   * 
   * @param {string} boardId - The ID of the board to search for the card.
   * @param {string} cardName - The name of the card to search for.
   * @returns {Object|null} - The found card object if it matches the name, otherwise null.
   */
  findCardByName(boardId, cardName) {
    let cards = this.getAllCards(boardId); // Note: use `this` to refer to the instance method
    let card = cards ? cards.find(item => item.name === cardName) : null;
    return card;
  }

  /**
   * getCardComments
   * * Retrieves all comment actions from a specified card.
   * * @param {string} cardId - The ID of the card to retrieve comments from.
   * @returns {Array|null} - An array of comment action objects if found, otherwise null.
   */
  getCardComments(cardId) {
    let call = new ApiCall();
    // Filter specifically for commentCard actions
    let url = `https://api.trello.com/1/cards/${cardId}/actions?filter=commentCard`;
    let comments = call.getApi(url);
    return comments;
  }

    getCardActions(cardId, filter) {
    let call = new ApiCall();
    let url = `https://api.trello.com/1/cards/${cardId}/actions?filter=${filter}`;
    let actions = call.getApi(url);
    return actions;
  }


  /**
   * getChecklists
   * Retrieves all checklists from a specified card.
   * @param {string} cardId - The ID of the card.
   * @returns {Array|null} - An array of checklist objects.
   */
  getChecklists(cardId) {
    let call = new ApiCall();
    let url = `https://api.trello.com/1/cards/${cardId}/checklists`;
    let checklists = call.getApi(url);
    return checklists;
  }

  /**
   * removeAllLabelsInList
   * * Retrieves all cards in a list and removes every label attached to them.
   * * @param {string} listId - The ID of the list to clean.
   */
  removeAllLabelsInList(listId) {
    // 1. Get all cards from the list
    let cards = this.getCardsFromList(listId);
    
    if (!cards || cards.length === 0) {
      console.log("No cards found in list or error retrieving cards.");
      return;
    }
  
    // 2. Loop through every card
    cards.forEach(card => {
      // Only process if the card actually has labels
      if (card.idLabels && card.idLabels.length > 0) {
        try {
           // We update the card with an empty array [] which wipes all tags
           this.updateCard(card.id, { idLabels: [] });
           console.log(`Cleaned labels for card: ${card.name}`);
           Utilities.sleep(50); // Slight pause to respect API limits
        } catch (e) {
           console.log(`Error cleaning card ${card.name}: ${e}`);
        }
      }
    });
  }
  

}

// Functions to interact with ManageCards class

/**
 * getCard
 * 
 * Retrieves a card by its ID.
 * 
 * @param {string} cardId - The ID of the card to retrieve.
 * @returns {Object|null} - The card object if found, otherwise null.
 */
function getCard(cardId) {
  let cards = new ManageCards();
  let card = cards.getCard(cardId);
  return card;
}

/**
 * getCardsFromList
 * 
 * Retrieves all cards from a specified list.
 * 
 * @param {string} listId - The ID of the list to retrieve cards from.
 * @returns {Array|null} - An array of card objects if found, otherwise null.
 */
function getCardsFromList(listId) {
  let cards = new ManageCards();
  let cardList = cards.getCardsFromList(listId);
  return cardList;
}

/**
 * getAllCards
 * 
 * Retrieves all cards from a specified board.
 * 
 * @param {string} boardId - The ID of the board to retrieve cards from.
 * @returns {Array|null} - An array of card objects if found, otherwise null.
 */
function getAllCards(boardId) {
  let cards = new ManageCards();
  let cardList = cards.getAllCards(boardId);
  return cardList;
}

function getArchivedCards(boardId) {
  let cards = new ManageCards();
  let cardList = cards.getArchivedCards(boardId);
  return cardList;
}

/**
 * createCard
 * 
 * Creates a new card in a specified list.
 * 
 * @param {string} listId - The ID of the list where the card will be created.
 * @param {Object} options - The options for the new card.
 * @returns {Object|null} - The created card object if successful, otherwise null.
 */
function createCard(listId, options) {
  let cards = new ManageCards();
  let newCard = cards.createCard(listId, options);
  return newCard;
}

/**
 * updateCard
 * 
 * Updates an existing card by its ID.
 * 
 * @param {string} cardId - The ID of the card to update.
 * @param {Object} options - The options for updating the card.
 * @returns {Object|null} - The updated card object if successful, otherwise null.
 */
function updateCard(cardId, options) {
  let cards = new ManageCards();
  let update = cards.updateCard(cardId, options);
  return update;
}

/**
 * getCardAttachments
 * 
 * Retrieves all attachments from a specified card.
 * 
 * @param {string} cardId - The ID of the card to retrieve attachments from.
 * @returns {Array|null} - An array of attachment objects if found, otherwise null.
 */
function getCardAttachments(cardId) {
  let cards = new ManageCards();
  let attachments = cards.getCardAttachments(cardId);
  return attachments;
}

/**
 * addAttachmentToCard
 * 
 * Adds an attachment to a specified card.
 * 
 * @param {string} cardId - The ID of the card to which the attachment will be added.
 * @param {Object} options - The options for the attachment.
 * @returns {Object|null} - The created attachment object if successful, otherwise null.
 */
function addAttachmentToCard(cardId, options) {
  let cards = new ManageCards();
  let attach = cards.addAttachmentToCard(cardId, options);
  return attach;
}

function deleteAttachmentFromCard(cardId, attatchmentId) {
  let cards = new ManageCards();
  let attach = cards.deleteAttachmentFromCard(cardId, attatchmentId);
  return attach;
}

/**
 * findCardByName
 * 
 * Searches for a card by name within a specified board.
 * 
 * @param {string} boardId - The ID of the board to search for the card.
 * @param {string} cardName - The name of the card to search for.
 * @returns {Object|null} - The found card object if it matches the name, otherwise null.
 */
function findCardByName(boardId, cardName) {
  let cards = new ManageCards();
  let card = cards.findCardByName(boardId, cardName);
  return card;
}


/**
 * addCommentToCard
 * 
 * Adds a comment to a specified card.
 * 
 * @param {string} cardId - The ID of the card to which the comment will be added.
 * @param {string} commentText - The text of the comment to be added.
 * @returns {Object|null} - The response object if successful, otherwise null.
 */
function addCommentToCard(cardId, commentText) {
    let call = new ApiCallPOST();
    let url = `https://api.trello.com/1/cards/${cardId}/actions/comments`;
    let options = {
        text: commentText
    };
    let response = call.postApi(url, options);
    return response;
}

/**
 * getCardComments
 * * Retrieves all comments from a specified card.
 * * @param {string} cardId - The ID of the card to retrieve comments from.
 * @returns {Array|null} - An array of comment objects if found, otherwise null.
 */
function getCardComments(cardId) {
  let cards = new ManageCards();
  let comments = cards.getCardComments(cardId);
  return comments;
}

function getChecklists(cardId) {
  let cards = new ManageCards();
  let checklists = cards.getChecklists(cardId);
  return checklists;
}

// Function to get card actions:

function getCardActions(cardId, filter) {
  let cards = new ManageCards();
  return cards.getCardActions(cardId, filter);
}

/**
 * removeAllLabelsInList
 * * Wrapper function to remove all labels from a list.
 * * @param {string} listId - The ID of the list to clean.
 */
function removeAllLabelsInList(listId) {
  let cards = new ManageCards();
  cards.removeAllLabelsInList(listId);
}