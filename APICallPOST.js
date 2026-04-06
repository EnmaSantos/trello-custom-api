/**
 * Class ApiCallPOST
 * 
 * This class is designed to handle POST API calls to a specified URL
 * using a specific API key and token for authentication. It provides
 * a method to perform the POST request, sending a payload, and handling
 * the response or any errors that may occur during the API call.
 */
class ApiCallPOST {

  /**
   * Constructor for the ApiCallPOST class.
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
   * postApi
   * 
   * This method performs a POST request to the specified URL,
   * appending the API key and token for authentication. It sends
   * the provided payload and handles the response from the API call.
   * 
   * @param {string} url - The URL to which the POST request will be sent.
   * @param {Object} payload - The data to be sent with the POST request.
   * @returns {Object|null} - The parsed JSON response from the API if the request is successful; 
   *                          otherwise, returns null.
   */
  postApi(url, payload) {
    // Check if the URL already contains query parameters
    if (url.includes('?')) {
      // Append the API key and token to the URL as query parameters
      url = url + `&key=${this.key}&token=${this.token}`;
    } else {
      // Append the API key and token to the URL as query parameters
      url = url + `?key=${this.key}&token=${this.token}`;
    }

    // Set up options for the POST request
    let options = {
      method: 'post',                     // HTTP method for the request
      contentType: 'application/json',    // Specifies the content type of the payload
      payload: JSON.stringify(payload)    // The payload to send with the request, converted to JSON
    };

    try {
      // Make the API call using UrlFetchApp
      let response = UrlFetchApp.fetch(url, options);

      // Get the HTTP response code
      let responseCode = response.getResponseCode();

      // Check if the response code indicates success (200 OK)
      if (responseCode == 200) {
        // Parse and return the JSON response
        return JSON.parse(response.getContentText());
      }
    } catch (error) {
      console.log(url);
      // Log error details in case of an exception during the API call
      Logger.log("Error in postApi method");
      Logger.log('Error Name: ' + error.name);      // Log the name of the error
      Logger.log('Error Message: ' + error.message); // Log the message of the error
      Logger.log('Error Stack: ' + error.stack);     // Log the stack trace of the error
    }

    // Return null if the request was not successful or an error occurred
    return null;
  }
}
