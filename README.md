# Ajax.JSLib
 
 * @author Mayor Technology
 * @version 2.2 
 
A simple JavaScript Library for sending Ajax Requests

This library is useful for sending HTTPRequests otherwise known as Ajax - Asynchronous Javascript and XML -
To make use of this Library, add any of the Library Files "ajax-request.js" or "ajax-request.min.js" then call the sendxhr() function with 2 - 5 parameters. 

The first parameter is the parameters as a string in the format "param1=value1&param2=value2" just like in GET Requests

The second parameter is the URL to send the requests to 

The third parameter is the data type to be returned possible values are XML, JSON or HTML

The fourth parameter is the method to use in sending the request. Possible values are POST or GET 

The fifth parameter is the callback to be executed after the request is completed, this callback should be passed a single parameter which is the response from the HTTPRequest


Code samples

*****
<pre><code>
 var params = "name="+encodeURIComponent("My Name");
 params += "&country="+encodeURIComponent("My Country");
 sendxhr(params, "serversidescript.php", "JSON", "POST", function(response){
  // callback function actions
 }, function(){
  // function to execute when an error occurs
 });
</code></pre>


### CHANGE LOG
 
1.1
*****
* Send XmlHTTPRequests
* Treat JSON, XML and HTML response by a custom optional callback function
 


1.2
*****
* Provision for network unavailability error handling, using a custom __treatXHRError() function or the default alert



2.1
*****
* Now connection error can be handled with a custom error passed to the call of this function as its 6 parameter



2.2
*****
* A minor fix to error handling
* Documentation update
  
