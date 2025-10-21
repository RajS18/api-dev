import nodemailer from 'nodemailer';
export const accountEmail = 'r918sh@gmail.com';
const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:accountEmail,
        pass:env.MAILER_PASSWORD
    }
});
export default transporter;