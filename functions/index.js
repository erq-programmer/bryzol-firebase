const functions = require('firebase-functions');
const sgMail = require('@sendgrid/mail');
const cors = require('cors')({ origin: true });

exports.sendEmail = functions.https.onRequest((request, response) => {
  sgMail.setApiKey(functions.config().sendgrid.key);

  const msg = {
    to: 'erq.programmer@gmail.com',
    from: request.body.email,
    subject: `[Bryzol] Nowa wiadomość od ${request.body.name}`,
    text: request.body.message
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
