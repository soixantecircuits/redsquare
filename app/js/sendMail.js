// create a new instance of the Mandrill class with your API key
var m = new mandrill.Mandrill(auth.API_KEY);

// create a variable for the API call parameters
var params = {
    "message": {
        "from_email":auth.sender,
        "to":[],
        "subject": "You've been shot !",
        "html": '<img src="cid:SHOOT"> <p>Hey *|NAME|* *|LASTNAME|*, how goes ?.</p>',
        "autotext":true,
        "track_opens":true,
        "track_clicks":true,
        "merge_vars": [],
        "images": []
    }
};

function sendTheMail(el) {
// Send the email!
    params.message.to = [];
    params.message.merge_vars = [];
    params.message.images = [];

    var to = {"email":el.email};
    var merge_vars = {
                "rcpt": el.email,
                "vars": [
                    {
                        "name": "NAME",
                        "content": el.name
                    },
                    {
                        "name": "LASTNAME",
                        "content": el.lastname
                    }
                ]
            };
    params.message.to.push(to);
    params.message.merge_vars.push(merge_vars);
    params.message.images.push(imageToBeSent);

    m.messages.send(params, function(res) {
        console.log(res);
    }, function(err) {
        console.error(err);
    });
}