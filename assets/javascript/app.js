//  Prevent form's default page refresh on submit event 
$("#weatherForm").submit(function(e) {
  e.preventDefault();
});

//  Form Obtain User Input On Submit
function submitWeather() {
  //  take in the user's input and save it in a variable
  var formData = $("#city-input").val();
  //  hide the input form - animation
  $("#weatherForm").hide(400);
  //  run the getWeather function using the user's input
  getWeather(formData);
  //  console.log the input to test that input is being correctly stored
  console.log(formData);
};

//  Retreive Weather for User Input, Convert and Display Data
//  Also allow for continuous use without refreshing ('new location' button)
function getWeather(city) {

  //  Make sure weather display div is hidden until user inputs a city
  $("#weatherStuff").hide(0);

  //  Set variables for API usage based on Open Weather Map API documentation - https://openweathermap.org/current
  var APIKey = "6005fe42692397b491ce1918d7e4b99b";
  //  API Key belongs to Bryan Lee - bryan-lee-git.github.io
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + APIKey;

  //  Ajax API call
  $.ajax({
      //  set the API url
      url: queryURL,
      //  set the ajax method to "GET"
      method: "GET"
      //  then do this while promising to run the above API call until it is finished
  }).then(function(weather) {

      //  Add weather objects not requiring special conversion to page
      $(".city").html("Location: " + weather.name);
      $(".humidity").text("Humidity: " + weather.main.humidity + "%");

      //  Kelvin to Fahrenheit Converter
      function kelvinToFahrenheit(k) {
          //  calculation for converting degrees K to degrees F
          var fahrenheit = (k - 273.15) * 1.80 + 32;
          //  add rounded up temperature in F to page
          $(".temp").text("Temperature: " + Math.ceil(fahrenheit) + "°F");
      };

      //  Meters Per Second to Miles Per Hour
      function metersToMiles(meters) {
          //  calculation for converting mps to mph
          var miles = meters * (25 / 11);
          //  add rounded mph to page
          $(".wind").text("Wind: " + Math.ceil(miles) + " mph");
      };

      //  Wind Meteorological Degrees to Compass Direction Acronyms
      function windDirection(deg) {
          // set variable to hold the wind direction acronym
          var direction = "";
          //  if, else if statements for compass direction acronyms
          if (deg >= 11.25 && deg <= 33.75) {
              direction = "NNE";
          } else if (deg >= 33.75 && deg <= 56.25) {
              direction = "ENE";
          } else if (deg >= 56.25 && deg <= 78.75) {
              direction = "E";
          } else if (deg >= 78.75 && deg <= 101.25) {
              direction = "ESE";
          } else if (deg >= 101.25 && deg <= 123.75) {
              direction = "ESE";
          } else if (deg >= 123.75 && deg <= 146.25) {
              direction = "SE";
          } else if (deg >= 146.25 && deg <= 168.75) {
              direction = "SSE";
          } else if (deg >= 168.75 && deg <= 191.25) {
              direction = "S";
          } else if (deg >= 191.25 && deg <= 213.75) {
              direction = "SSW";
          } else if (deg >= 213.75 && deg <= 236.25) {
              direction = "SW";
          } else if (deg >= 236.25 && deg <= 258.75) {
              direction = "WSW";
          } else if (deg >= 258.75 && deg <= 281.25) {
              direction = "W";
          } else if (deg >= 281.25 && deg <= 303.75) {
              direction = "WNW";
          } else if (deg >= 303.75 && deg <= 326.25) {
              direction = "NW";
          } else if (deg >= 326.25 && deg <= 348.75) {
              direction = "NNW";
          } else {
              direction = "N"; 
          }
          //  add wind direction acronym to page appended to wind speed
          $(".wind").append(" " + direction);
      };

      //  Percentage of Cloud Cover to Descriptive Statement Conversion
      function isCloudy(clouds) {
          //  variable to hold cloud cover description
          var cloudy = "";
          //  if/else if statements for various possibilities
          if (clouds >= 50 && clouds <= 75) {
              cloudy = "Very cloudy";
          } else if (clouds >= 76) {
              cloudy = "Cloud covered";
          } else if (clouds >= 25 && clouds <= 49) {
              cloudy = "Mostly cloudy";
          } else if (clouds <= 24 && clouds >= 5) {
              cloudy = "Partly cloudy";
          } else if (clouds > 1 && clouds <= 4) {
              cloudy = "Just a little cloudy";
          } else if (clouds <= 1) {
              cloudy = "No clouds";
          }
          //  add the cloud cover description to the page
          $(".clouds").text("Clouds: " + cloudy);

      };

      //  Run all conversion functions above
      kelvinToFahrenheit(weather.main.temp);
      metersToMiles(weather.wind.speed);  
      windDirection(weather.wind.deg); 
      isCloudy(weather.clouds.all);
      
      //  Reveal the retrieved and treated data on the page
      $("#weatherStuff").show(1700);
  });

  //  Create 'new location' button for easy application reuse without page refresh
  var newLocation = $("<button id='refreshBtn' class='btn btn-primary'>New Location</button>");

  //  Add the 'new location' button to the page after weather data
  $("#weatherStuff").after(newLocation);
  
  //  Immediately hide and then display button for page animation
  newLocation.hide(0);
  newLocation.fadeIn(1900);

  //  Refresh button
  $("#refreshBtn").on("click", function() {
      // Reveal input form and hide the old data
      $("#weatherStuff").fadeOut(1500);
      $("#refreshBtn").fadeOut(1500);
      $("#weatherForm").show(1500);
  });
};