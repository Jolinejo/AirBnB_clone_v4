var listy = {};
$(document).ready(function () {
  $(".amenities input[type='checkbox']").change(function () {
    if (this.checked) {
      // Use push to add the value to the array
      listy[$(this).data("id")] = $(this).data("name");
    } else {
      delete listy[$(this).data("id")];
    }

    // Use text() to set the text content of the h4 element
    $(".amenities h4").text(""); // Clear existing content
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
});
