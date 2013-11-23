// create a new instance of the Mandrill class with your API key
var m = new mandrill.Mandrill(auth.API_KEY);

// create a variable for the API call parameters
var params = {
    "template_name": auth.template_name,
    "template_content": [
    ],
    "message": {
        "headers": {
            "Reply-To": auth.reply_to
        },
        "from_email":auth.sender,
        "to":[],
        "subject": auth.subject,
        "html": '',
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
    params.message.attachments = [{
        "name": "ameduvoyage.jpg",
        "type": "image/jpeg",
        "content": imageToBeSent.content
    }];

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

    m.messages.sendTemplate(params, function(res) {
        console.log(res);
    }, function(err) {
        console.error(err);
    });
}