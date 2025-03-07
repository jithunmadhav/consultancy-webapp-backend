const otpTextBody = (otp,name) => `
Dear ${name},

We received a request to log in to your account. To complete the process and ensure your account's security, please use the one-time verification code provided below:

**Your Verification Code:** ${otp}

⚠️ **Note:** This code is valid for the next **5 minutes** only. If you did not request this verification code, please ignore this email, and your account will remain secure.

Thank you for choosing our service.

Best regards,  
 
`;

const otpTextBodyClient = (otp,name) => `
Dear ${name},

To complete your login process and ensure the security of your account, please use the one-time verification code provided below:

**Your Verification Code:** ${otp}

⚠️ **Note:** This code is valid for the next **5 minutes** only. If you did not request this verification code, please ignore this email, and your account will remain secure.

Thank you for using our service.

Best regards,  
 
`;

const forgotPasswordTextBody = (otp,clientName) => `
Dear ${clientName},

We received a request to reset the password associated with your account. To proceed with the password reset, please use the one-time verification code provided below:

Verification Code: ${otp}

This code is valid for the next 5 minutes. If you did not request a password reset, please ignore this email, and no changes will be made to your account.

If you have any questions or need assistance, feel free to contact our support team.

Thank you,  `

const accountCreationEmail = (clientName, email, password) => `
Dear ${clientName},

We are excited to inform you that an account has been created for you on our platform.

Here are your account details:

- **Email**: ${email}
- **Temporary Password**: ${password}

To ensure the security of your account, we recommend you log in and update your password as soon as possible. You can access your account using the following link:

(https://plutussolutions.in/)

If you did not request this account or believe this was sent in error, please contact us immediately.

Thank you for choosing our platform. If you have any questions or need assistance, feel free to reach out to our support team.

Best regards,  
The Team at [Your Company Name]  

---

*Note: For security purposes, do not share your login credentials with anyone.*
`;



export { otpTextBody,accountCreationEmail,otpTextBodyClient,forgotPasswordTextBody };
