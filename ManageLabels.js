/**
 * Class ManageLabels
 * 
 * This class provides methods to interact with Trello labels. It includes
 * functionality to retrieve specific labels by ID and to get all labels
 * associated with a particular board.
 */
class ManageLabels {

  /**
   * getLabel
   * 
   * Retrieves a specific label by its ID.
   * 
   * @param {string} labelId - The ID of the label to retrieve.
   * @returns {Object|null} - The label object if found, otherwise null.
   */
  getLabel(labelId) {
    let call = new ApiCall();
    let url = `https://api.trello.com/1/labels/${labelId}`;
    let label = call.getApi(url);
    return label;
  }

  /**
   * getAllLabels
   * 
   * Retrieves all labels associated with a specified board.
   * 
   * @param {string} boardId - The ID of the board for which to retrieve labels.
   * @returns {Array|null} - An array of label objects if found, otherwise null.
   */
  getAllLabels(boardId) {
    let call = new ApiCall();
    let url = `https://api.trello.com/1/boards/${boardId}/labels`;
    let labels = call.getApi(url);
    return labels;
  }

  findLabelByEmail(boardId, email) {
    let labels = getAllLabels(boardId);
    let canvasUser = CanvasAPILibrary.findUserByEmail(email);
    let user = labels.find(user => user.name == canvasUser.name);

    return user;
  }

  createLabel(boardId, name, color) {
    let call = new ApiCallPOST();
    let url = `https://api.trello.com/1/labels?name=${name}&color=${color}&idBoard=${boardId}`;
    let label = call.postApi(url);
    return label;
  }

}

/**
 * getAllLabels
 * 
 * Wrapper function to retrieve all labels associated with a specified board.
 * 
 * @param {string} boardId - The ID of the board for which to retrieve labels.
 * @returns {Array|null} - An array of label objects if found, otherwise null.
 */
function getAllLabels(boardId) {
  let label = new ManageLabels();
  let labels = label.getAllLabels(boardId);
  return labels;
}

/**
 * getLabel
 * 
 * Wrapper function to retrieve a specific label by its ID.
 * 
 * @param {string} labelId - The ID of the label to retrieve.
 * @returns {Object|null} - The label object if found, otherwise null.
 */
function getLabel(labelId) {
  let labels = new ManageLabels();
  let label = labels.getLabel(labelId);
  return label;
}

function findLabelByEmail(boardId, email) {

  let labels = new ManageLabels();
  let label = labels.findLabelByEmail(boardId, email);
  return label;

}

function createLabel(boardId, name, color) {
  let labels = new ManageLabels();
  let label = labels.createLabel(boardId, name, color);
  return label;
}