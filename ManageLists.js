/**
 * Class ManageLists
 * 
 * This class provides methods to interact with Trello lists. It includes
 * functionality to retrieve all lists for a board, retrieve a specific list
 * by its ID, and create a new list.
 */
class ManageLists {

  /**
   * getAllLists
   * 
   * Retrieves all lists associated with a specified board.
   * 
   * @param {string} boardId - The ID of the board for which to retrieve lists.
   * @returns {Array|null} - An array of list objects if found, otherwise null.
   */
  getAllLists(boardId) {
    let call = new ApiCall();
    let url = `https://api.trello.com/1/boards/${boardId}/lists`;
    let list = call.getApi(url);
    return list;
  }

  /**
   * getList
   * 
   * Retrieves a specific list by its ID.
   * 
   * @param {string} listId - The ID of the list to retrieve.
   * @returns {Object|null} - The list object if found, otherwise null.
   */
  getList(listId) {
    let call = new ApiCall();
    let url = `https://api.trello.com/1/lists/${listId}`;
    let list = call.getApi(url);
    return list;
  }

  /**
   * createList
   * 
   * Creates a new list on a Trello board.
   * 
   * @param {string} boardId - The ID of the board where the list will be created.
   * @param {Object} options - The options for creating the list (e.g., name).
   * @returns {Object|null} - The newly created list object if successful, otherwise null.
   */
  createList(boardId, options) {
    let call = new ApiCallPOST();
    let url = `https://api.trello.com/1/lists?idBoard=${boardId}`; // Corrected URL to use query parameter
    let list = call.postApi(url, options);
    return list;
  }
}

/**
 * getAllLists
 * 
 * Wrapper function to retrieve all lists associated with a specified board.
 * 
 * @param {string} boardId - The ID of the board for which to retrieve lists.
 * @returns {Array|null} - An array of list objects if found, otherwise null.
 */
function getAllLists(boardId) {
  let list = new ManageLists();
  let lists = list.getAllLists(boardId);
  return lists;
}

/**
 * getList
 * 
 * Wrapper function to retrieve a specific list by its ID.
 * 
 * @param {string} listId - The ID of the list to retrieve.
 * @returns {Object|null} - The list object if found, otherwise null.
 */
function getList(listId) {
  let lists = new ManageLists();
  let list = lists.getList(listId);
  return list;
}

/**
 * createList
 * 
 * Wrapper function to create a new list on a specified Trello board.
 * 
 * @param {string} boardId - The ID of the board where the list will be created.
 * @param {Object} options - The options for creating the list (e.g., name).
 * @returns {Object|null} - The newly created list object if successful, otherwise null.
 */
function createList(boardId, options) {
  let lists = new ManageLists();
  let newList = lists.createList(boardId, options);
  return newList;
}
