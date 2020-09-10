function getUrlParameters(parameter, staticURL, decode){
    var currLocation = (staticURL.length)? staticURL : window.location.search,
        parArr = currLocation.split("?")[1].split("&"),
        returnBool = true;
    for(var i = 0; i < parArr.length; i++){
        parr = parArr[i].split("=");
        if(parr[0] == parameter){
            return (decode) ? decodeURIComponent(parr[1]) : parr[1];
            returnBool = true;
        }else{
            returnBool = false;            
        }
    }
    if(!returnBool) return false;  
};

const getData = async () => {
    const response = await fetch('https://api-test-django.herokuapp.com/api/products');
    const myJson = await response.json();
    localStorage.setItem('Products', JSON.stringify(myJson));
} 

const showData = () => {
    let productArr = JSON.parse(localStorage.getItem('Products'));
    let category = productArr.category;
    let product = productArr.data;
    console.log(category);
    console.log(product);
}

$(function() {
    let productArr = JSON.parse(localStorage.getItem('Products'));
    let template = $('#products-template').html();
    let templateProductCompile = Handlebars.compile(template);

    Handlebars.registerHelper("makeBold", function(options) {
        return new Handlebars.SafeString( "<strong>" + options.fn(this) + "</strong>" );
    });

    Handlebars.registerHelper("toUpper", function(options) {
        return options.fn(this).toUpperCase();
    });

    // Event Delegation for handlebars
    // $('#list-products').on("click", ".details", function(e) {
    //     e.preventDefault();
    //     alert('Hi');
    // });

    if( $('body').hasClass("carDetails") ) {
        let carID = getUrlParameters("id", "", true);
        $('#list-products').html(templateProductCompile(productArr.data[carID-1])); 
    }else {
        $('#list-products').html(templateProductCompile(productArr)); 
    }
});