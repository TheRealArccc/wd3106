var jsonStringListOfFood = '{ "items" : [ '           +
    '{ "name": "carrot",     "price": "5" },'   +
    '{ "name": "broccoli",   "price": "6" },'   +
    '{ "name": "corn",       "price": "3" },'   +
    '{ "name": "onion",      "price": "8" },'   +
    '{ "name": "potato",     "price": "7" } '   +
    '] }';



$(document).ready(function(){


    var jsonObjectListOfFood = JSON.parse(jsonStringListOfFood);
    var jsonObjectList = jsonObjectListOfFood.items;

    for (i = 0; i < jsonObjectList.length; i++) {

        var object = jsonObjectList[i];

        //add card for object
        var itemName = object.name;
        var itemPrice = object.price;

        var newCard = getCardElement(itemName, itemPrice);
        $("#food-items").append(newCard);
    }

    $("#search-bar").on("keyup", filterCards);

    $("#food-items .card").hover(addHighlight, removeHighlight);

    $("#food-items .card .fa-minus-square").click(removeCartItem);
    $("#food-items .card .fa-plus-square").click(addCartItem);

    $(".checkout #checkout-btn").click(checkoutCart);
});

//Hover
function addHighlight() {
    $(this).removeClass("bg-light")
    $(this).addClass("text-white bg-info");
}

function removeHighlight() {
    $(this).removeClass("text-white bg-info");
    $(this).addClass("bg-light")
}

function filterCards() {
    var searchTerm = $(this).val().toLowerCase();

    $("#food-items .card").each(function() {
        var cardContent = $(this).find("h2.card-text").text().toLowerCase();
        var searchMatch = cardContent.indexOf(searchTerm) > -1;
        $(this).toggle(searchMatch); // show if match, hide id not matched
    });
}

function getCardElement(itemName, itemPrice) {
    var newCard = '<div class="card bg-light">'        +
                  '<div class="card-body text-center">'+
                  '<h2 class="card-text">'             +
                  itemName                             +
                  '</h2>'                              +
                  '<img src="img/item-'                +
                  itemName                             +
                  '.png">'                             +
                  '<h5> $'                             +
                  itemPrice                            +
                  '</h5>'                              +
                  '<div class="cart-buttons">'         +
                  '<i class="fas fa-minus-square fa-2x"></i>'+
                  '<span class="qty"> Qty: '             +
                  '<span class="qty-value"> 0 </span>' +
                  '</span>'                            +
                  '<i class="fas fa-plus-square fa-2x"></i>'+
                  '</div>'                             +
                  '</div>';
    return newCard;
}

function addCartItem() {
    var quantityHolder = $(this).parent(".cart-buttons").find(".qty-value").first();

    var currentQty = parseInt(quantityHolder.text());
    var newQty = currentQty + 1;
    quantityHolder.html(newQty);
}

function removeCartItem() {
    var quantityHolder = $(this).parent(".cart-buttons").find(".qty-value").first();

    var currentQty = parseInt(quantityHolder.text());
    var newQty = Math.max(currentQty - 1, 0)
    quantityHolder.html(newQty)
}

//Checkout
function checkoutCart() {
    var receipt = {};
    receipt["totalCost"] = 0;

    var foodItemsContainer = $(this).parents("body").find("#food-items");
    foodItemsContainer.find(".card").each(function() {
        //add to total cost
        var itemName = $(this).find("h2.card-text").text();

        var itemsPriceString = $(this).find("h5").text().replace("$", "");
        var itemPriceInt = parseInt(itemsPriceString);

        var itemQtyString = $(this).find('.qty-value').text();
        var itemQtyInt = parseInt(itemQtyString);

        var itemCost = itemPriceInt * itemQtyInt;
        console.log(itemPriceInt * itemQtyInt)
        if (itemCost > 0) {
            receipt[itemName] = itemQtyString;
            receipt["totalCost"] += itemCost;
        }
    });

    console.log(receipt);

    var message = "Confirm and proceed to payment";
    message += "\n Total cost: $" + receipt["totalCost"];

    for (var itemName in receipt) {
        //iterate through attributes of receipt
        if (itemName == "totalCost") {
            continue;
        }

        var itemQtyString = receipt[itemName];
        console.log(itemQtyString);
        message += "\n" + itemQtyString + "x   " + itemName;
    }

    var response = confirm(message);

    if(response == true) {
        //direct to payment
        console.log("Proceeding to payment");
        sessionStorage.setItem("totalCost", receipt["totalCost"]);
        window.location.replace("payment.html");
    }

    localStorage.setItem(itemQtyString);
    localStorage.removeItem(itemQtyString)
}

document.addEventListener("DOMContentLoaded", function() {
    function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    myImage.style.display = "none";

    var audio = document.getElementById("myAudio");
    var triggerImage = document.getElementById("triggerImage");
    var clickCount = 0;
    var lastClickTime = 0;
  
    // Function to handle image clicks
    function handleImageClick() {
      var currentTime = new Date().getTime();
  
      // Check if the maximum clicking interval (1 second) has passed
      if (currentTime - lastClickTime <= 1000) {
        // Increment the click count
        clickCount++;
  
        // Check if the image has been clicked 10 times
        if (clickCount >= 10) {
          // Play the audio
          audio.volume = 1
          audio.play();
          wait(2000); // Wait for 2000 milliseconds (2 seconds)
          // Show image
          setTimeout(500)
          myImage.style.display = "inline-block";
          // Example: Hide the image after 2 seconds
          setTimeout(hideImage, 2000);
  
          // Reset the click count for future clicks
          clickCount = 0;
        }
      } else {
        // Reset the click count if the maximum interval has passed
        clickCount = 1;
      }
  
      // Update the last click time
      lastClickTime = currentTime;
    }
  
    // Add a click event listener to the trigger image
    triggerImage.addEventListener("click", handleImageClick);
  });



  
