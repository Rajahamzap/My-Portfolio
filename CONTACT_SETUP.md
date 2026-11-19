# Contact form

The form posts to `/api/contact` on the Node server (`server.js`). Every valid message is saved to the admin dashboard (Contact Inquiries). If Resend is configured (see `.env.example`), it is also emailed to `CONTACT_TO_EMAIL`.

* No email configured: messages still arrive in the dashboard. The visitor sees "Your message has been received", which is true because it was stored.
* Nothing stored and no email: the form shows an honest error and your email address.
* Protection: client and server validation, hidden honeypot, minimum fill time, 5 posts per IP per 10 minutes, input escaping, no API keys in the browser.

See `DEPLOY_CMS.md` for full setup.
