var listy = {};
var staty = {};
var citys = {};
$(document).ready(function () {
  $(".amenities input[type='checkbox']").change(function () {
    if (this.checked) {
      listy[$(this).data("id")] = $(this).data("name");
    } else {
      delete listy[$(this).data("id")];
    }

    $(".amenities h4").text("");
    $(".amenities h4").css({
      "height": "18px",
      "width": "200px",
      "white-space": "nowrap",
      "overflow": "hidden",
      "text-overflow": "ellipsis"
    });

    var app = [];
    for (const value of Object.values(listy)) {
      app.push(value);
    }
    $(".amenities h4").append(app.join(", "));
  });

  $(".s input[type='checkbox']").not(".c input[type='checkbox']").change(function () {
    if (this.checked) {
      staty[$(this).data("id")] = $(this).data("name");
    } else {
      delete staty[$(this).data("id")];
    }
    console.log("here")

    $(".locations h4").text("");
    $(".locations h4").css({
      "height": "18px",
      "width": "200px",
      "white-space": "nowrap",
      "overflow": "hidden",
      "text-overflow": "ellipsis"
    });

    var app = [];
    for (const value of Object.values(staty)) {
      app.push(value);
    }
    for (const value of Object.values(citys)) {
      app.push(value);
    }
    $(".locations h4").append(app.join(", "));
  });

  $(".c input[type='checkbox']").change(function () {
    if (this.checked) {
      citys[$(this).data("id")] = $(this).data("name");
    } else {
      delete citys[$(this).data("id")];
    }

    $(".locations h4").text("");
    $(".locations h4").css({
      "height": "18px",
      "width": "200px",
      "white-space": "nowrap",
      "overflow": "hidden",
      "text-overflow": "ellipsis"
    });

    var app = [];
    for (const value of Object.values(staty)) {
      
      app.push(value);
    }
    for (const value of Object.values(citys)) {
      app.push(value);
    }
    $(".locations h4").append(app.join(", "));
  });


  

  // get status of API
  $.getJSON("http://0.0.0.0:5001/api/v1/status/", (data) => {
    if (data.status === "OK") {
      $("div#api_status").addClass("available");
    } else {
      $("div#api_status").removeClass("available");
    }
  });

   
  // Define the searchPlace function
  const searchPlace = function () {
	let search_data = {
		"states": Object.keys(staty),
		"cities": Object.keys(citys),
		"amenities": Object.keys(listy)

	  };
	  console.log(search_data);

    $.ajax({
	  type: 'POST',
      url: `http://0.0.0.0:5001/api/v1/places_search`,
      data: JSON.stringify({ search_data }),
      contentType: "application/json",
      success: (data) => {
        $("section.places").empty();

		console.log(data.length)
        data.forEach((place) =>
          $("section.places").append(
            `<article>
              <div class="title_box">
                <h2>${place.name}</h2>
                <div class="price_by_night">$${place.price_by_night}</div>
              </div>
              <div class="information">
                <div class="max_guest">${place.max_guest} Guest${
                  place.max_guest !== 1 ? "s" : ""
                }</div>
                <div class="number_rooms">${place.number_rooms} Bedroom${
                  place.number_rooms !== 1 ? "s" : ""
                }</div>
                <div class="number_bathrooms">${place.number_bathrooms} Bathroom${
                  place.number_bathrooms !== 1 ? "s" : ""
                }</div>
              </div> 
              <div class="description">
                ${place.description}
              </div>
            </article>`
          )
        );
      },
    });
  };

  // search places
  $("button").click(function () {
    searchPlace();
  });

  searchPlace();
});