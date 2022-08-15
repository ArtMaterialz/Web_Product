

var username, first_name, last_name, password, gender, address, email, mobile_number, profile_picture, token;

token = sessionStorage.getItem("token");

function getProductData() {
    var request = new XMLHttpRequest();
    request.open('GET', product_url, true);

    request.onload = function() {

        loadPic()
        

    product_array = JSON.parse(request.responseText);

    var link = "/product.html"
    const queryString = window.location.pathname;

    const queryString2 = window.location.search;
    const urlParams = new URLSearchParams(queryString2);
    var pass2 = urlParams.get("gender")
    var pass3 = urlParams.get("product")

    
    if(pass2 == 1 ||pass2 == 3 || pass2 ==2)
    {
        displayProduct(category);
    }
    else
    {
        if(queryString != link)
        {
            pass()
        }
        else 
        {
            displayProduct(category);
        }
        };
    }

   
  
    
    request.send();
}


function displayProduct(category) 
{    
    var table = document.getElementById("productTable");    
    var productCount = 0;    
    var message = "";    

    table.innerHTML = "";    
    totalProduct = product_array.length;    

    for (var count = 0; count < totalProduct; count++) 
    {   
        if(category == "available")
        {
            if (product_array[count].availability == category) 
            {            
                var thumbnail = product_array[count].thumbnail;            
                var title = product_array[count].product_name;
                var type = product_array[count].product_type;    
                var url = product_array[count].url_link; 
                var id = product_array[count].product_id;
                var rating = product_array[count].overall;
                var cell =  
                '<div class="col-md-3 product_model_display" style="float: none; margin: 0 auto;">' +                          
                                '<div class="flip-container" >' +              
                                    '<div class="flipper">' +
                                        '<div class="front">' + 
                                            '<a id="" href='+ url +' data-target="" data-toggle="" " item=' + count + ' onclick="getURL(title)">'+
                                                '<img src=' + thumbnail + ' / class="thumb_image">'+
                                            '</a>'+
                                        '</div>'+                              
                                        '<div class="back">'+                                   
                                                '<span><b>' + title + '</b></span><br>' +
                                                '<span>' + rating + 
                                                '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16" >'+
                                                '<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>'+
                                              '</svg>'+
                                                '</span><br>' +    
                                                '<p style="font-size: 14px; color: #bfbfbf;">' + type + '</p>' +               
                                            '</div>'+
                                        '</div>'+
                                    '</div>' +
                                '</div>' +
                            '</div>'; 
                table.insertAdjacentHTML('beforeend', cell); 
                document.getElementById("parent").textContent = "";           
                productCount++;   

                let avgRating;
                const getRating = new XMLHttpRequest();
                getRating.open("POST",  getRating_url  , false);
                getRating.setRequestHeader("Content-Type", "application/json");
                getRating.onload= function() {
                    var show = JSON.parse(getRating.responseText);
                    avgRating = show[0].average;
                    
                    
                    const updateRate = new XMLHttpRequest();
                    updateRate.open("POST",  updateRate_url  , true);
                    updateRate.setRequestHeader("Content-Type", "application/json");
                    updateRate.onload= function() {
                        // This part is just updating rating to table ;)
                 
                    }

                    if(avgRating == null)
                    {
                        result = 0;
                        var payload2 = {overall: result, id :id }
                        updateRate.send(JSON.stringify(payload2));
                    }
                    else
                    {
                        var payload2 = {overall: avgRating, id :id }
                        updateRate.send(JSON.stringify(payload2));
                    }
                }
                var payload = {rid:id}
                getRating.send(JSON.stringify(payload));         
            } 
        }
        else 
        {
            if (product_array[count].product_type == category) 
            {            
               
                var thumbnail = product_array[count].thumbnail;            
                var title = product_array[count].product_name;
                var type = product_array[count].product_type; 
                var url = product_array[count].url_link; 
                var rating = product_array[count].overall;
        
                var cell =  
                '<div class="col-md-3 product_model_display" style="float: none; margin: 0 auto;">' +                          
                    '<div class="flip-container" >' +              
                        '<div class="flipper">' +
                            '<div class="front">' + 
                                '<a id="" href='+ url +' data-target="" data-toggle="" " item=' + count + ' onclick="getURL(title)">'+
                                    '<img src=' + thumbnail + ' / class="thumb_image">'+
                                '</a>'+
                            '</div>'+                              
                            '<div class="back">'+                                   
                                    '<span>' + title + '</span><br>' +
                                    '<span>' + rating + 
                                    '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16" >'+
                                    '<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>'+
                                
                                '</svg>'+
                                    '</span><br>' +    
                                    '<p>' + type + '</p>' +               
                                '</div>'+
                            '</div>'+
                        '</div>' +
                    '</div>' +
                '</div>'; 
                 table.insertAdjacentHTML('beforeend', cell);            
                 productCount++;     
                    
             } 
             else if(product_array[count].product_name == category)
             {
                var thumbnail = product_array[count].thumbnail;            
                var title = product_array[count].product_name;
                var type = product_array[count].product_type; 
                var url =product_array[count].url_link; 
                var rating = product_array[count].overall;
        
                var cell =  
                '<div class="col-md-3 product_model_display" style="float: none; margin: 0 auto;">' +                          
                '<div class="flip-container" >' +              
                    '<div class="flipper">' +
                        '<div class="front">' + 
                            '<a id="" href='+ url +' data-target="" data-toggle="" " item=' + count + ' onclick="getURL(title)">'+
                                '<img src=' + thumbnail + ' / class="thumb_image">'+
                            '</a>'+
                        '</div>'+                              
                        '<div class="back">'+                                   
                                '<span>' + title + '</span><br>' +
                                '<span>' + rating + 
                                '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16" >'+
                                '<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>'+
                            
                              '</svg>'+
                                '</span><br>' +    
                                '<p>' + type + '</p>' +               
                            '</div>'+
                        '</div>'+
                    '</div>' +
                '</div>' +
            '</div>'; 
                 table.insertAdjacentHTML('beforeend', cell);            
                 productCount++;     
             }
        }
    }    
   
    // document.getElementById("summary").textContent = message;    
    document.getElementById("parent").textContent = "";
}


function getSearch_data()
{
   var SearchName = new XMLHttpRequest();
        SearchName.open("POST",  Search_url  , true);
        SearchName.setRequestHeader("Content-Type", "application/json");
        SearchName.onload= function() {
            var show = JSON.parse(SearchName.responseText);
          
        
            if(show.test2 != "error")
            {
                r_name = show[0].name;
                displayProduct(r_name)
            }
            else
            {
              
                if(x == "")
                 {
                      displayProduct("available")
                  }
                  else
                  {
                    displayProduct(x)
                  }
            }
        }
    
        var x = document.getElementById("search_value").value;
        var payload = {search: x}
        SearchName.send(JSON.stringify(payload));
} 

//filter Button

function listFastFood() {
    category = "Snacks";
    displayProduct(category);
  
}

function listJapan() {
    category = "Technology"; 
    displayProduct(category);

}
function listThai() {
    category = "Home Essential"; 
    displayProduct(category);
  
}

function listAll() {
    category = "available"; 
    displayProduct(category);
   
}

function FastFood() {
  var item = document.getElementById("Fast_Food").value;
  localStorage.setItem(item);
  return false;
}

function pass()
{
    const queryString = window.location.pathname;
    const urlParams = new URLSearchParams(queryString);
    var pass = urlParams.get("name")
    category = pass; 
    displayProduct(category);
    // document.getElementById("result").innerHTML = pass;
 
}

function getURL(name)
{
    let url = new URL('/product_info.html?');
    let params = new URLSearchParams(url.pathname);
    
    //Add a second foo parameter.
    params.append('n', name);
    //Query string is now: 'foo=1&bar=2&foo=4'
}


function getProduct() {
    var request = new XMLHttpRequest();
    request.open('GET', product_url2, true);

    request.onload = function() {

        product_array2 = JSON.parse(request.responseText);
    
        const queryString = window.location.pathname;
        const urlParams = new URLSearchParams(queryString);

        var pass = urlParams.get("name")
 
        var table = document.getElementById("result2");  
        table.innerHTML = "";  
        totalProduct = product_array2.length;    
        
        for (var count = 0; count < totalProduct; count++) 
        {   
            if (product_array2[count].product_name == pass) 
            {
                var url = product_array2[count].product_type; 
                var cell = '<span>' + url + '</span><br>';
                table.insertAdjacentHTML('beforeend', cell);   
            }
          
         }
        
        };
        request.send();
}


function searchProduct() {
    // var input = document.getElementById("nextlocation").value;

    var request = new XMLHttpRequest();
    request.open('GET', search_url, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function() {

            var product_name = JSON.parse(request.responseText);
            
        };

        var search =  document.getElementById("nextlocation").value;
        var payload = {search:search}
        request.send(JSON.stringify(payload));
}
