import 'dotenv/config'

module.exports = {
  transport: {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD
    }
  },
  defaults: {
    from: {
      name: process.env.MAIL_FROM_NAME
    },
    replyTo: process.env.MAIL_REPLY_TO
  },
  templateDir: process.env.MAIL_TEMPLATE_DIR
}