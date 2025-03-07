import AWS  from 'aws-sdk';
import 'aws-sdk/lib/maintenance_mode_message.js';
const SES_CONFIG = {
  accessKeyId: process.env.SES_ACCESS_KEY,
  secretAccessKey: process.env.SES_SECRET_KEY,
  region: process.env.SES_REGION,
};

const AWS_SES = new AWS.SES(SES_CONFIG);


const sendEmail = async (recipientEmail,emailBody,subject) => {
    const htmlBody = '';
 
  let params = {
    Source: process.env.SES_SENDER_MAIL,
    Destination: {
      ToAddresses: [
        recipientEmail
      ],
    },
    ReplyToAddresses: [],
    Message: {
      Body: {
        // Html: {
        //   Charset: 'UTF-8',
        //   Data:  htmlBody,
        // },
        Text: {
          Charset: "UTF-8",
          Data:  emailBody
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data:subject,
      }
    },
  };

  try {
    const res = await AWS_SES.sendEmail(params).promise();
    console.log('Email has been sent!', res);
  } catch (error) {
    console.error(error);
  }
}



 export { sendEmail }

