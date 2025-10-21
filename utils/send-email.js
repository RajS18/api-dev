import dayjs from "dayjs";
import { emailTemplates } from "./email_template.js"
import transporter,{ accountEmail } from "../config/nodemailer.js";

export const sendEmailReminder = async ({to, type, subs}) => {
    if( !to || !type)throw new Error("Email parameters missing");
    const template = emailTemplates.find(t => t.label === type);
    if(!template) throw new Error("Email template not found");
    const mailInfo = {
        userName : subs.user.name,
        subscriptionName : subs.name,
        userEmail : to,
        planName : subs.name,
        subsPrice : `${subs.currency} ${subs.price} (${subs.frequency})`,
        renewalDate : dayjs(subs.renewalDate).format('MMMM D, YYYY'),
        paymentMethod : subs.paymentMethod,

    }
    const message = templpate.generateBody(mailInfo);
    const subject = template.generateSubject(mailInfo);
    const  mailOptions = {
        from: accountEmail,
        to: to,
        subject: subject,
        html: message
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          return console.error("Error sending email:", error);
        }
        console.log('Email sent: ' + info.response);
        });
}