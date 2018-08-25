$("#weatherForm").submit(function(e) {
    e.preventDefault();
    });

    var formData = "";

    function submitWeather() {
      formData = $("#city-input").val();
      $("#weatherForm").hide(400);
      getWeather(formData);
      console.log(formData);
    }


    function getWeather(city) {
      $("#weatherStuff").hide(0);
      $("#weatherStuff").show(2000);
      var APIKey = "6005fe42692397b491ce1918d7e4b99b";
      var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + APIKey;

      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(weather) {

        function kelvinToFahrenheit(k) {
          var fahrenheit = (k - 273.15) * 1.80 + 32;
          $(".temp").text("Temperature: " + Math.ceil(fahrenheit) + "°F");
        } 

        function metersToMiles(meters) {
          var miles = meters * (25 / 11);
          $(".wind").text("Wind: " + Math.ceil(miles) + " mph");
        }

        function windDirection(deg) {

          var direction = ""

          if (deg >= 11.25 && deg <= 33.75){
            direction = "NNE";
          }else if (deg >= 33.75 && deg <= 56.25){
            direction = "ENE";
          }else if (deg >= 56.25 && deg <= 78.75){
            direction = "E";
          }else if (deg >= 78.75 && deg <= 101.25){
            direction = "ESE";
          }else if (deg >= 101.25 && deg <= 123.75){
            direction = "ESE";
          }else if (deg >= 123.75 && deg <= 146.25){
            direction = "SE";
          }else if (deg >= 146.25 && deg <= 168.75){
            direction = "SSE";
          }else if (deg >= 168.75 && deg <= 191.25){
            direction = "S";
          }else if (deg >= 191.25 && deg <= 213.75){
            direction = "SSW";
          }else if (deg >= 213.75 && deg <= 236.25){
            direction = "SW";
          }else if (deg >= 236.25 && deg <= 258.75){
            direction = "WSW";
          }else if (deg >= 258.75 && deg <= 281.25){
            direction = "W";
          }else if (deg >= 281.25 && deg <= 303.75){
            direction = "WNW";
          }else if (deg >= 303.75 && deg <= 326.25){
            direction = "NW";
          }else if (deg >= 326.25 && deg <= 348.75){
            direction = "NNW";
          }else{
            direction = "N"; 
          }
          $(".wind").append(" " + direction);
        }

        function isCloudy(clouds) {
          var cloudy = ""
          if (clouds >= 50 && clouds <= 75) {
            cloudy = "Very cloudy"
          } else if (clouds >= 76) {
            cloudy = "Cloud covered"
          } else if (clouds >= 25 && clouds <= 49) {
            cloudy = "Mostly cloudy"
          } else if (clouds <= 24 && clouds >= 5) {
              cloudy = "Partly cloudy"
          } else if (clouds > 1 && clouds <= 4) {
              cloudy = "Just a little cloudy"
          } else if (clouds <= 1) {
              cloudy = "No clouds"
          }
          $(".clouds").text("Clouds: " + cloudy);
        }

        //run conversions
        kelvinToFahrenheit(weather.main.temp);
        metersToMiles(weather.wind.speed);  
        windDirection(weather.wind.deg); 
        isCloudy(weather.clouds.all)

        // dump the city and humidity on to page
        $(".city").html("Location: " + weather.name);
        $(".humidity").text("Humidity: " + weather.main.humidity + "%");
      });

      var newLocation = $("<button style='width:300px;' id='refreshBtn' class='btn btn-primary'>New Location</button>");
      $("#weatherStuff").after(newLocation);
      newLocation.hide(0);
      newLocation.show(2500);
      $("#refreshBtn").on("click", function() {
        $("#refreshBtn").hide(1500);
        $("#weatherForm").show(1500);
        $("#weatherStuff").hide(1500);
      });
    };