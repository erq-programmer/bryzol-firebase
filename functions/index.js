const functions = require('firebase-functions');
const sgMail = require('@sendgrid/mail');
const cors = require('cors')({ origin: true });

exports.sendEmail = functions.https.onRequest((request, response) => {
  sgMail.setApiKey(functions.config().sendgrid.key);

  const msg = {
    to: 'kontakt@bryzol.pl',
    from: request.body.email,
    subject: `[Bryzol] Nowa wiadomość od ${request.body.name}`,
    html: `<div><p><strong>Imię i nazwisko: </strong>${request.body.name}</p><p><strong>Email: </strong>${request.body.email}</p><p><strong>Numer telefonu: </strong>${request.body.tel}</p><p><strong>Wiadomość: </strong>${request.body.message}</p></div>`,
  };

  cors(request, response, () => {
    sgMail.send(msg, (err, res) => {
      if (err) {
        response.send(500);
      } else {
        response.send(res);
      }
    });
  });
});
