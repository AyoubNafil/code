
/*global chrome*/

export async function getDomainCookies() {
  

    //console.log("in");
    try {

      const currentUrl = window.location.href;

      // Create a new URL object
      const url = new URL(currentUrl);

      // Extract the base URL
      const baseUrl = url.searchParams.get('url');
      console.log(baseUrl);
      const cookies = await chrome.cookies.getAll({ url: baseUrl });
     
      console.log(cookies);
      for (var i = 0; i < cookies.length; i++) {
        if (cookies[i].name === "sid") {
          var accessToken = cookies[i].value;
          var domain = cookies[i].domain;
          console.log([domain,accessToken]);

          return [domain,accessToken];
         
      }}
  
      if (cookies.length === 0) {
        return 'No cookies found';
      }
  
    
    } catch (error) {
      return 'Unexpected error: '+error;
    }
  
  
  }


  