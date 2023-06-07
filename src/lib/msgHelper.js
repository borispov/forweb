import axios from 'axios';

export async function sendMessage(data) {
  let config = {
    method: 'post',
    url: `https://graph.facebook.com/${import.meta.env.VERSION}/${import.meta.env.PHONE_NUMBER_ID}/messages`,
    headers: {
      'Authorization': `Bearer ${import.meta.env.ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    },
    data: data
  };

  return axios(config)
}

export function getTemplatedMessageInput(recipient, form) {

  return JSON.stringify({ 
    messaging_product: "whatsapp",
    to: "972508564794", 
    type: "text", 
    text: {
      body: "I am"
    }
  })


  return '{ "messaging_product": "whatsapp", "to": "972508564794", "type": "template", "template": { "name": "hello_world", "language": { "code": "en_US" } } }'

  return `{
  "messaging_product": "whatsapp",
  "recipient_type": "individual",
  "to": recipient,
  "type": "template",
  "template": {
    "name": "form_submission",
    "language": {
      "code": "en_US"
    },
    "components": [
      {
        "type": "body",
        "parameters": [
          {
            "type": "text",
            "text": form.name
          }
        ]
      }
    ]
  }
}`



  return JSON.stringify({
    "messaging_product": "whatsapp",
    "to": recipient,
    "type": "template",
    "template": {
      "name": "form_submission",
      "language": {
        "code": "en_US"
       }
    }
  })

  // return JSON.stringify({
  //   "messaging_product": "whatsapp",
  //   "to": recipient,
  //   "type": "template",
  //   "template": {
  //     "name": "Forweb Form Submission",
  //     "language": {
  //       "code": "en_US"
  //     },
  //     "components": [
  //       {
  //         "type": "header",
  //         "parameters": [
  //           {
  //             "type": "text",
  //             "text": "Forweb Form Submission - " + form.name
  //           }
  //         ]
  //       },
  //       {
  //         "type": "body",
  //         "parameters": [
  //           {
  //             "type": "text",
  //             "text": form.name
  //           },
  //           {
  //             "type": "text",
  //             "text": form.company
  //           },
  //           {
  //             "type": "text",
  //             "text": form.phone
  //           },
  //           {
  //             "type": "text",
  //             "text": form.email
  //           },
  //           {
  //             "type": "text",
  //             "text": form.message
  //           }
  //
  //         ]
  //       }
  //     ]
  //   }
  // }
  // );
}

export function getTextMessageInput(recipient, text) {

  return '{ "messaging_product": "whatsapp", "to": "972508564794", "type": "template", "template": { "name": "hello_world", "language": { "code": "en_US" } } }'

  return JSON.stringify({
    "messaging_product": "whatsapp",
    "recipient_type": "individual",
    "to": recipient,
    "type": "text",
    "text": {
        "body": text
    }
  });

  return JSON.stringify({
    "messaging_product": "whatsapp",
    "preview_url": false,
    "recipient_type": "individual",
    "to": recipient,
    "type": "text",
    "text": {
        "body": text
    }
  });
}

export function formatDataAsMessage(name, company, email, phone, message){
  return `
    Forweb submission received!

    Name: ${name}
    Company Name: ${company}
    Email: ${email}
    Phone Num: ${phone}

    Here is the message he left: 
    ${message}
  `
}
