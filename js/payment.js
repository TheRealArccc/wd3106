$(document).ready(function() {
    //retrieve value from sessionStorage
    var amount = sessionStorage.getItem("totalCost");

    //set value in html element
    $("#amt-value").html("$" + amount);
    
    $("#pay-btn").click(function() {
        //send email using mail to protocol
        var mailtoString = "mailto:your@email.com"    +
                           "?subject=Make%20Payment"  +
                           "&body=Paid%"              +
                           amount;

        window.location.href = mailtoString;
    })
});

