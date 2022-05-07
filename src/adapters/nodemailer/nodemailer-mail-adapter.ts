import nodemailer from "nodemailer";

import { IMailAdapter, ISendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASSWORD,
  },
});

export class NodemailerMailAdapter implements IMailAdapter {
  async sendMail({ subject, body }: ISendMailData) {
    await transport.sendMail({
      from: "Equipe Feedget <oi@feedget.com>",
      to: "Felipe Lima <mrfelipelima@gmail.com>",
      subject,
      html: body,
    });
  }
}
