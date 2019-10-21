function ajaxRequest() {
  try {
    var request = new XMLHttpRequest();
  } catch (e1) {
    try {
      request = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e2) {
      try {
        request = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (e3) {
        request = false;
      }
    }
  }
  return request;
}

function getActivatedObjected(e) {
  var obj;
  if (!e) {
    obj = window.event.srcElement;
  } else if (e.srcElement) {
    obj = e.srcElement;
  } else {
    obj = e.target;
  }
  return obj;
}

/**
 * Send a XMLHTTPRequest
 * Takes from one to five parameters, used to control the
 * usage of the function.
 *
 * @param {string} params the HTTP query to be sent
 * @param {string} url the URL to send the request to
 * @param {string} restype the type of response to get
 * if HTML, JSON or XML
 * @param {string} method the method of the request if
 * GET or POST
 * @param {function} callback The call back function to execute
 * aftter the request has been received.
 * A parameter should be passed to the function and that is
 * the response from the request
 *
 * @author Mayor Technology
 * @version 1.2
 * @requires requires the above defined ajaxRequest Function
 *
 * CHANGELOG
 * 1.1
 *  Send XmlHTTPRequests
 *  Treat JSON, XML and HTML response by a custom optional callback function
 *
 * 1.2
 *  Provision for network unavailability error handling, using a custom __treatXHRError() function or the default alert
 *
 * 2.1
 *  Now connection error can be handled with a custom error passed to the call of this function as its 6 parameter
 */
function sendxhr(params, url, restype, method, callback, xhrError) {
  if (typeof (restype) === "undefined") {
    restype = "HTML";
  }
  if (typeof (method) === "undefined") {
    method = "POST";
  }
  url = (method === "POST") ? url : url + "?" + params;

  var request = new ajaxRequest();

  request.open(method, url, true);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.onerror = function(){
    if (typeof(__treatXHRError) === "function"){
      __treatXHRError(request);
    }else if (typeof(xhrError) === "function"){
      xhrError();
    }else{
      alert("oops! seems you are offline, please check your connection and try again... Thanks");
    }
  };

  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        if (this.responseText !== null) {
          var response;
          if (restype === "JSON") {
            response = eval('(' + this.responseText + ')');
          } else {
            response = this.responseText;
          }

          if (typeof (callback) !== "undefined") {
            callback(response);
          }
        }
      }
    }
  }
  ;
  if (method === "POST") {
    request.send(params);
  } else {
    request.send();
  }
}

/**
 * Send a XMLHTTPRequest
 * Takes from one to five parameters, used to control the
 * usage of the function.
 *
 * @param {string} params the HTTP query to be sent
 * @param {string} url the URL to send the request to
 * @param {string} restype the type of response to get
 * if HTML, JSON or XML
 * @param {string} method the method of the request if
 * GET or POST
 * @param {function} callback The call back function to execute
 * aftter the request has been received.
 * A parameter should be passed to the function and that is
 * the response from the request
 */
function sendForm(params, url, callback, xhrError) {
  var request = new ajaxRequest();

  request.open("POST", url, true);
  request.onerror = function(){
    if (typeof(__treatXHRError) === "function"){
      __treatXHRError(request);
    }else if (typeof(xhrError) === "function"){
      xhrError();
    }else{
      alert("oops! seems you are offline, please check your connection and try again... Thanks");
    }
  };

  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        if (this.responseText !== null) {
          var response;
          response = eval('(' + this.responseText + ')');

          if (typeof (callback) !== "undefined") {
            callback(response);
          }
        }
      }
    }
  }
  ;
  request.send(params);
}
