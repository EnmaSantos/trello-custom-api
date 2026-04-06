/**
 * Class ManageChecklists
 * 
 * This class provides methods to interact with Trello checklists. It includes
 * functionality to retrieve, create, and update checklists and their items
 * associated with Trello cards.
 */
class ManageChecklists {

  /**
   * getChecklists
   * 
   * Retrieves all checklists for a specified card.
   * 
   * @param {string} cardId - The ID of the card for which to retrieve checklists.
   * @returns {Array|null} - An array of checklist objects if found, otherwise null.
   */
  getChecklists(cardId) {
    let call = new ApiCall();
    let url = `https://api.trello.com/1/cards/${cardId}/checklists`;
    let list = call.getApi(url);
    return list;
  }

  getChecklist(checkListId) {
    let call = new ApiCall();
    let url = `https://api.trello.com/1/checklists/${checkListId}`;
    let list = call.getApi(url);
    return list;
  }

  /**
   * createChecklist
   * 
   * Creates a new checklist for a specified card.
   * 
   * @param {string} cardId - The ID of the card where the checklist will be created.
   * @param {Object} options - The options for the new checklist (e.g., name).
   * @returns {Object|null} - The created checklist object if successful, otherwise null.
   */
  createChecklist(cardId, options) {
    let call = new ApiCallPOST();
    let url = `https://api.trello.com/1/cards/${cardId}/checklists`;
    let list = call.postApi(url, options);
    return list;
  }

  /**
   * createChecklistItem
   * 
   * Adds a new item to a specified checklist.
   * 
   * @param {string} checklistId - The ID of the checklist to which the item will be added.
   * @param {Object} options - The options for the new checklist item (e.g., name).
   * @returns {Object|null} - The created checklist item object if successful, otherwise null.
   */
  createChecklistItem(checklistId, options) {
    let call = new ApiCallPOST();
    let url = `https://api.trello.com/1/checklists/${checklistId}/checkItems`;
    let item = call.postApi(url, options);
    return item;
  }

  /**
   * updateChecklistItem
   * 
   * Updates an existing item in a specified checklist.
   * 
   * @param {string} checklistId - The ID of the checklist containing the item to update.
   * @param {string} itemId - The ID of the item to update.
   * @param {Object} options - The options for updating the checklist item.
   * @returns {Object|null} - The updated checklist item object if successful, otherwise null.
   */
  updateChecklistItem(cardId, itemId, options) {
    let call = new ApiCallPUT();
    let url = `https://api.trello.com/1/cards/${cardId}/checkItem/${itemId}`;
    let update = call.putApi(url, options);
    return update;
  }

  deleteChecklistItem(checklistId, itemId) {
    let call = new ApiCallDELETE();
    let url = `https://api.trello.com/1/checklists/${checklistId}/checkItems/${itemId}`;
    let del = call.delApi(url);
    return del;
  }
}

/**
 * getChecklists
 * 
 * Retrieves all checklists for a specified card.
 * 
 * @param {string} cardId - The ID of the card for which to retrieve checklists.
 * @returns {Array|null} - An array of checklist objects if found, otherwise null.
 */
function getChecklists(cardId) {
  let lists = new ManageChecklists();
  let list = lists.getChecklists(cardId);
  return list;
}

function getChecklist(checkListId) {
  let lists = new ManageChecklists();
  let list = lists.getChecklist(checkListId);
  return list;
}

/**
 * createChecklist
 * 
 * Creates a new checklist for a specified card.
 * 
 * @param {string} cardId - The ID of the card where the checklist will be created.
 * @param {Object} options - The options for the new checklist.
 * @returns {Object|null} - The created checklist object if successful, otherwise null.
 */
function createChecklist(cardId, options) {
  let lists = new ManageChecklists();
  let newList = lists.createChecklist(cardId, options);
  return newList;
}

/**
 * createChecklistItem
 * 
 * Adds a new item to a specified checklist.
 * 
 * @param {string} checklistId - The ID of the checklist to which the item will be added.
 * @param {Object} options - The options for the new checklist item.
 * @returns {Object|null} - The created checklist item object if successful, otherwise null.
 */
function createChecklistItem(checklistId, options) {
  let lists = new ManageChecklists();
  let newItem = lists.createChecklistItem(checklistId, options);
  return newItem;
}

/**
 * updateChecklistItem
 * 
 * Updates an existing item in a specified checklist.
 * 
 * @param {string} checklistId - The ID of the checklist containing the item to update.
 * @param {string} itemId - The ID of the item to update.
 * @param {Object} options - The options for updating the checklist item.
 * @returns {Object|null} - The updated checklist item object if successful, otherwise null.
 */
function updateChecklistItem(checklistId, itemId, options) {
  let items = new ManageChecklists();
  let update = items.updateChecklistItem(checklistId, itemId, options);
  return update;
}

function deleteChecklistItem(checklistId, itemId, options) {
  let items = new ManageChecklists();
  let update = items.deleteChecklistItem(checklistId, itemId, options);
  return update;
}
