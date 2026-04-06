/**
 * Class ApiCallDELETE
 * 
 * This class is designed to handle DELETE API calls to a specified URL
 * for a Trello-like service using a specific API key and token for 
 * authentication. It provides a method to perform the DELETE request
 * and handle the response or any errors that may occur during the
 * API call.
 */
class ApiCallDELETE {

  /**
   * Constructor for the ApiCallDELETE class.
   * Initializes the API key, token, and board ID required for API calls.
   */
  constructor() {
    // API token for authentication with the service
    const props = PropertiesService.getScriptProperties();

    this.token = props.getProperty('SERVICE_TOKEN');
    this.key = props.getProperty('SERVICE_API_KEY');

    if (!this.token || !this.key) {
      throw new Error('Set SERVICE_TOKEN and SERVICE_API_KEY in Project Settings → Script properties');
     }
    
  }

  /**
   * delApi
   * 
   * This method performs a DELETE request to the specified URL with
   * the provided payload. It appends the API key and token to the URL
   * for authentication and handles the response from the API call.
   * 
   * @param {string} url - The URL to which the DELETE request will be sent.
   * @param {Object} payload - The payload to be sent with the DELETE request.
   * @returns {Object|null} - The parsed JSON response from the API if the request is successful; 
   *                          otherwise, returns null.
   */
  delApi(url, payload) {
    // Check if the URL already contains query parameters
    if (url.includes('?')) {
      // Append the API key and token to the URL as query parameters
      url = url + `&key=${this.key}&token=${this.token}`;
    } else {
      // Append the API key and token to the URL as query parameters
      url = url + `?key=${this.key}&token=${this.token}`;
    }

    // Set up options for the DELETE request
    let options = {
      method: 'delete',             // HTTP method for the request
      contentType: 'application/json', // Specifies the content type of the payload
      payload: payload               // The payload to send with the request
    };

    let response;

    try {
      // Make the API call using UrlFetchApp
      response = UrlFetchApp.fetch(url, options);

      // Get the HTTP response code
      let responseCode = response.getResponseCode();

      // Check if the response code indicates success
      if (responseCode == 200) {
        // Parse and return the JSON response
        return JSON.parse(response.getContentText());
      }
    } catch (error) {
      
      if (response.getResponseCode() == 429) {

        Utilities.sleep(11000)
        delApi(url, payload);

      }

      // Log error details in case of an exception during the API call
      Logger.log("Error in delApi method");
      Logger.log('Error Name: ' + error.name);      // Log the name of the error
      Logger.log('Error Message: ' + error.message); // Log the message of the error
      Logger.log('Error Stack: ' + error.stack);     // Log the stack trace of the error
    }

    // Return null if the request was not successful or an error occurred
    return null;
  }
}
