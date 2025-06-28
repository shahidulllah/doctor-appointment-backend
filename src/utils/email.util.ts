export const sendMockEmail = (to: string, subject: string, message: string) => {
  console.log(`📧 [Mock Email] To: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`Message:\n${message}`);
};
