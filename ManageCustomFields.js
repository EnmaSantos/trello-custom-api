/**
 * Class ManageCustomFields
 * 
 * This class provides methods to interact with Trello custom fields.
 * It includes functionality to retrieve custom fields for cards and boards,
 * and to set custom field values on specific cards.
 */
class ManageCustomFields {

  /**
   * getCardCustomFields
   * 
   * Retrieves all custom fields associated with a specified card.
   * 
   * @param {string} cardId - The ID of the card for which to retrieve custom fields.
   * @returns {Array|null} - An array of custom field items if found, otherwise null.
   */
  getCardCustomFields(cardId) {
    let call = new ApiCall();
    let url = `https://api.trello.com/1/cards/${cardId}/customFieldItems`;
    let items = call.getApi(url);
    return items;
  }

  /**
   * getCustomFields
   * 
   * Retrieves all custom fields for a specified board.
   * 
   * @param {string} boardId - The ID of the board for which to retrieve custom fields.
   * @returns {Array|null} - An array of custom field objects if found, otherwise null.
   */
  getCustomFields(boardId) {
    let call = new ApiCall();
    let url = `https://api.trello.com/1/boards/${boardId}/customFields`;
    let fields = call.getApi(url);
    return fields;
  }

  getCustomField(fieldId) {
    let call = new ApiCall();
    let url = `https://api.trello.com/1/customFields/${fieldId}`;
    let field = call.getApi(url);
    return field;
  }

  /**
   * setCustomFieldOnCard
   * 
   * Sets a value for a specified custom field on a given card.
   * 
   * @param {string} cardId - The ID of the card where the custom field will be set.
   * @param {string} fieldId - The ID of the custom field to set.
   * @param {Object} options - The options for the custom field item (e.g., value).
   * @returns {Object|null} - The updated custom field item if successful, otherwise null.
   */
  setCustomFieldOnCard(cardId, fieldId, options) {
    let call = new ApiCallPUT();
    let url = `https://api.trello.com/1/cards/${cardId}/customField/${fieldId}/item`;
    let update = call.putApi(url, options);
    return update;
  }

  setCurrentSemester(cardId) {

    let field = getCustomFields('4BOizjy8').find(field => field.id == "5f48256d3fc35318a7a70319");
    let options = field.options;

    let term = CanvasAPILibrary.getCurrentTerm();
    let semester = term.name;
    var list = semester.split(" ");
    var sem = list[0].slice(0, 2).toUpperCase();
    var year = list[1].slice(2);
    let name = '#' + sem + year;

    let current = options.find(option => option.value.text == name);

    let obj = {

      idValue : current.id

    }

    let update = setCustomFieldOnCard(cardId, field.id, obj)

    return update;

  }

  createCustomField(payload) {

    let call = new ApiCallPOST();
    let url = `https://api.trello.com/1/customFields`;
    let update = call.postApi(url, payload);
    return update;

  }

  createCustomFieldOption(fieldId, payload) {

    let call = new ApiCallPOST();
    let url = `https://api.trello.com/1/customFields/${fieldId}/options`;
    let update = call.postApi(url, payload);
    return update;

  }

  getCustomFieldOption(fieldId, optionId) {

    let call = new ApiCall();
    let url = `https://api.trello.com/1/customFields/${fieldId}/options/${optionId}`;
    let option = call.getApi(url);
    return option;

  }

}

/**
 * getCardCustomFields
 * 
 * Retrieves all custom fields associated with a specified card.
 * 
 * @param {string} cardId - The ID of the card for which to retrieve custom fields.
 * @returns {Array|null} - An array of custom field items if found, otherwise null.
 */
function getCardCustomFields(cardId) {
  let call = new ManageCustomFields();
  let items = call.getCardCustomFields(cardId);
  return items;
}

/**
 * getCustomFields
 * 
 * Retrieves all custom fields for a specified board.
 * 
 * @param {string} boardId - The ID of the board for which to retrieve custom fields.
 * @returns {Array|null} - An array of custom field objects if found, otherwise null.
 */
function getCustomFields(boardId) {
  let call = new ManageCustomFields();
  let fields = call.getCustomFields(boardId);
  return fields;
}

function getCustomField(fieldId) {
  let call = new ManageCustomFields();
  let fields = call.getCustomField(fieldId);
  return fields;
}

/**
 * setCustomFieldOnCard
 * 
 * Sets a value for a specified custom field on a given card.
 * 
 * @param {string} cardId - The ID of the card where the custom field will be set.
 * @param {string} fieldId - The ID of the custom field to set.
 * @param {Object} options - The options for the custom field item (e.g., value).
 * @returns {Object|null} - The updated custom field item if successful, otherwise null.
 */
function setCustomFieldOnCard(cardId, fieldId, options) {
  let call = new ManageCustomFields();
  let update = call.setCustomFieldOnCard(cardId, fieldId, options);
  return update;
}

function setCurrentSemester(cardId) {

  let call = new ManageCustomFields();

  let update = call.setCurrentSemester(cardId);

  return update;

}

function createCustomField(payload) {
  let customFields = new ManageCustomFields();
  let field = customFields.createCustomField(payload);
  return field;
}

function createCustomFieldOption(fieldId, payload) {
  let customFields = new ManageCustomFields();
  let field = customFields.createCustomFieldOption(fieldId, payload);
  return field;
}

function getCustomFieldOption(fieldId, optionId) {
  let customFields = new ManageCustomFields();
  let option = customFields.getCustomFieldOption(fieldId, optionId);
  return option;
}
