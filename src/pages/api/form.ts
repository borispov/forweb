import { APIRoute } from "astro";

import formData from 'form-data';
import Mailgun from "mailgun.js";


const sendThankYouEmail = async ( email: string, msg ) => {

  let k = import.meta.env.MAILGUN_API_KEY
  let domain = import.meta.env.NETLIFY_EMAILS_MAILGUN_DOMAIN

  const mailgun = new Mailgun(formData);
  const mg = mailgun.client({username: 'api', key: k });

  const mailData = {
    from: `FORWEB@${domain}`,
    to: ['boristofu@gmail.com'],
    subject: 'Forweb Form Submission!',
    text: msg,
  };

  mg.messages.create(domain, mailData)
    .then(msg => msg) 
    .catch(err => err)
};


import { sendMessage, getTextMessageInput, formatDataAsMessage, getTemplatedMessageInput } from "../../lib/msgHelper";

export const post: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get("name");
  const company = formData.get("company");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const message = formData.get("message");
  // Validate the formData - you'll probably want to do more than this
  

  if (!name || !email || !phone || !company) {
    console.log(`something is missing`)
    return new Response(
      JSON.stringify({
        message: "Missing required fields",
      }),
      { status: 400 }
    );
  }

  try {
    const formattedMessage = formatDataAsMessage(name, company, email, phone, message);
    await sendThankYouEmail( 'boristofu@gmail.com', formattedMessage )
    return new Response( JSON.stringify({ message: "Success! Form submitted, We'll respond within 48 hours." }))
  } catch(e) {
    console.log(e)
    return new Response( JSON.stringify({ message: "חלה שגיאה בשליחת הטופס. אנא לחץ על כפתור הוואטסאפ, או פנו באמצעות המייל: boristofu@gmail.com", error: e }))
  }


  // const data = getTemplatedMessageInput(import.meta.env.RECIPIENT_WAID, dataObj)
  // const data = getTextMessageInput(import.meta.env.RECIPIENT_WAID, dataObj)

  console.log(`This is the message structure: ${data}`)
  try {
    let res = await sendMessage(data)
    return new Response( JSON.stringify("Success! Form submitted, We'll respond within 48 hours."))
  } catch(error) {
      console.log(Object.entries(error));
      return new Response( JSON.stringify("ERRRORRRRRRRRRRRRR"))
  }

};
