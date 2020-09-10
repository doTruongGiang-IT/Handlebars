var cast = {
    "characters": [
        {
            "name": "Sheldon Cooper",
            "gender": "male",
            "actor": "Jim Parsons",
            "nickname": "Shelly",
            "image": "image/Sheldon.jpg",
            "block": {
                "phone": "0776134908",
                "address": "England"
            }
        },
        {
            "name": "Leonard Leakey Hofstadter",
            "gender": "male",
            "actor": "Johnny Galecki",
            "nickname": false,
            "image": "image/Leonerd.jpg",
            "block": {
                "phone": "0776134908",
                "address": "England"
            }
        },
        {
            "name": " Rajesh Ramayan Koothrappali",
            "gender": "male",
            "actor": "Kunal Nayyar",
            "nickname": "Raj",
            "image": "image/Rajesh.jpg",
            "block": {
                "phone": "0776134908",
                "address": "USA"
            }
        },
        {
            "name": "Bernadette Maryann Rostenkowski",
            "gender": "female",
            "actor": "Melissa Rauch",
            "nickname": "Bernie",
            "image": "image/Bernie.jpg"
        },
        {
            "name": "Penny Hofstadter",
            "gender": "female",
            "actor": "Kaley Cuoco",
            "nickname": false,
            "image": "image/penny.jpg"
        }
    ]
};

var data = {
    "language": "English"
};

$(function () {
    let character_template = $('#character-template').html();
    let compiledCharacterTemplate = Handlebars.compile(character_template);
    Handlebars.registerHelper("makeLink", function(text, url) {
        text = Handlebars.Utils.escapeExpression(text);
        url = Handlebars.Utils.escapeExpression(url);
        let theLink = '<a href="' + url + '">' + text + '</a>';
        return new Handlebars.SafeString(theLink);
    });
    Handlebars.registerHelper("changeColor", function(text, options) {
        text = Handlebars.Utils.escapeExpression(text);
        switch(options.hash.color) {
            case "red":
                return new Handlebars.SafeString("<span id='redtext'>" + text + "</span>");
                break;
            case "green":
                return new Handlebars.SafeString("<span id='greentext'>" + text + "</span>");
                break;
            case "blue":
                return new Handlebars.SafeString("<span id='bluetext'>" + text + "</span>");
                break;    
        }
    });
    Handlebars.registerHelper("sayHello", function(options) {
        switch(options.data.language) {
            case "Spanish":
                return "Hola";
                break;
            case "English":
                return new Handlebars.SafeString("<span id='redtext'>Hello</span>");
                break;
            case "French":
                return new Handlebars.SafeString("<span id='bluetext'>Bonjour</span>");
                break;    
            default:
                return new Handlebars.SafeString("<span id='greentext'>Xin chao</span>");
                break;    
        }
    });
    Handlebars.registerHelper("formatPhoneNumber", function(phone) {
        return new Handlebars.SafeString(
            "(" + phone.substr(0,3) + ")" + " - " + phone.substr(3,9)
        );
    });
    $('.list_character').html(compiledCharacterTemplate(cast));  
});

$(function() {
    let block = $('#block-helper').html();
    let template = Handlebars.compile(block);
    Handlebars.registerHelper("makeRadio", function(name, options) {
        let radioList = options.fn();
        radioList = radioList.trim().split(', ');
        let output = "";
        for(let val of radioList) {
            let item = val.trim();
            output += "<input type='radio' name='"+ name +"' value='"+ item +"'>"+ item + "<br />";
        }
        return output;
    });
    Handlebars.registerHelper("areEqual", function(num1, num2, options) {
        if( num1 === num2 ) {
            return options.fn(this);
        }else {
            return options.inverse(this);
        }
    });
    Handlebars.registerHelper("if", function(data, options) {
        if( data === 'isActive' ) {
            return options.fn(this);
        }else {
            return options.inverse(this);
        }
    });
    let templateData = template({});
    $('#contain').html(templateData);
});

$(function() {
    let template = $('#with-helper').html();
    // Handlebars.registerHelper("with", function(context, options) {
    //     return options.fn(context);
    // });
    let templateCompile = Handlebars.compile(template);
    let templateData = templateCompile( {
        "name": "Sheldon Cooper",
        "techdata": {
            "isbn": "0776134908",
            "author": "Do Truong Giang"
        }
    } )
    $('#with-contain').html(templateData);
});



let obj1 = {
    a: 1,
    b: 2,
    c: 3,
    d: {
        e: 10
    }
}

let obj2 = {
    ...obj1,
    z: 100
}

obj2.d = {
    ...obj1.d
};

obj2.d.e = 18;

console.log({ obj1, obj2 });