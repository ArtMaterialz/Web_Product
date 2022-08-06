var username, first_name, last_name, password, gender, address, email, mobile_number, profile_picture, token;
token = sessionStorage.getItem("token");

function loadPic()
{
        var getProfile = new XMLHttpRequest();
        getProfile.open("POST", getUser_url , true);
        getProfile.setRequestHeader("Content-Type", "application/json");
        getProfile.onload= function() 
        {
            var profile = JSON.parse(getProfile.responseText);
            profile_picture = profile[0].profile_picture
            document.getElementById('profilePic').src=profile_picture;
         }
    var payload = {token: token};
    getProfile.send(JSON.stringify(payload));

}

function displayProductInfo(category) 
{    
    
    var table = document.getElementById("result2");    
  
    table.innerHTML = "";    
    totalProduct = product_array2.length;    

    for (var count = 0; count < totalProduct; count++) 
    {   
            if (product_array2[count].product_name == category) 
            {                        
                var title = product_array2[count].product_name;
                var image = product_array2[count].thumbnail;
           
                var tag = product_array2[count].product_type;
                var desc = product_array2[count].description;
                var address = product_array2[count].location;
                var hour = product_array2[count].opening_hours;
                var is_hala = product_array2[count].is_halal;
               
                document.getElementById("r").textContent = title;
                document.getElementById("image2").src = image;
                document.getElementById("type_r").textContent = "("+tag+")";
            
                document.getElementById("desc_r").textContent = desc;
                // document.getElementById("telephone").textContent = tel;
                document.getElementById("address").textContent = address;
                document.getElementById("hours").textContent = hour;
                productCount++;                          
             }        
    }    
}

function getComment2()
{
    var getComment = new XMLHttpRequest();

    getComment.open("POST",  getComment_url  , true);
    getComment.setRequestHeader("Content-Type", "application/json");
    getComment.onload= function() {
        var show = JSON.parse(getComment.responseText);      
        document.getElementById("comment_id").innerHTML = show[0].count;
    }
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var pass = urlParams.get("id")
    
    var payload = {id:pass}
    getComment.send(JSON.stringify(payload));
}

function getRate()
{
    var getRating = new XMLHttpRequest();

    getRating.open("POST",  getRating_url  , true);
    getRating.setRequestHeader("Content-Type", "application/json");
    getRating.onload= function() {

        var show = JSON.parse(getRating.responseText);     
        document.getElementById("rate_id").innerHTML = show[0].average;
    }
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var pass = urlParams.get("id")
    
    var payload = {rid:pass}
    


    getRating.send(JSON.stringify(payload));
}

function getProductInfo() {
    var request = new XMLHttpRequest();
    request.open('GET', product_url2, true);

    request.onload = function() {
    loadPic();
    getRate();
    getComment2()
    product_array2 = JSON.parse(request.responseText);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var pass = urlParams.get("name")
        displayProductInfo(pass);
         fetchComments();
    };
    request.send();
}


//Display Google Map
function showMap() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var pass = urlParams.get("name")
    var map_l = new XMLHttpRequest();
    map_l.open("POST",  getPlace  , true);
    map_l.setRequestHeader("Content-Type", "application/json");
    map_l.onload= function() {
        var show = JSON.parse(map_l.responseText);
        longtitude1 = show[0].longtitude;
        latitude1 =  show[0].latitude;
        map = new google.maps.Map(document.getElementById("map"), { center: { lat: 1.8, lng: 110.9 }, zoom: 4 })
        var infoWindow = new google.maps.InfoWindow();
        var marker, i;
        var markers = [];
    
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(longtitude1, latitude1),
            map: map,
            icon: {
                url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
            }
        });
    
        markers.push(marker);
        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                infoWindow.setContent(pass)
                infoWindow.open(map, marker);
            }
        })(marker, i));
    
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
                map.setCenter(pos);
                map.setZoom(15);
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(pos.lat, pos.lng),
                    map: map,
                    icon: {
                        url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
                    }
                })
                markers.push(marker);
                google.maps.event.addListener(marker, 'click', (function (marker, i) {
                    return function () {
                        infoWindow.setContent("Your current location")
                        infoWindow.open(map, marker);
                    }
                })(marker, i));
            }
        )
    } 
    var payload = {name: pass}
    map_l.send(JSON.stringify(payload));
}





















