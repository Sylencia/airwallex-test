import { verifyEmail, ErrorType } from "./FormVerification";

it("should fail if the local part of the email is empty", () => {
  const email = "@domain.com";
  const verification = verifyEmail(email, email);
  expect(verification.success).toBe(false);
  expect((verification as ErrorType).error).toBe(
    "Please ensure your email is valid."
  );
});

it("should fail if the subdomain part of the email is empty", () => {
  const email = "validemail@.com";
  const verification = verifyEmail(email, email);
  expect(verification.success).toBe(false);
  expect((verification as ErrorType).error).toBe(
    "Please ensure your email is valid."
  );
});

it("should fail if the tld part of the email is empty", () => {
  const email = "validemail@domain.";
  const verification = verifyEmail(email, email);
  expect(verification.success).toBe(false);
  expect((verification as ErrorType).error).toBe(
    "Please ensure your email is valid."
  );
});

it("should fail if the emails don't match", () => {
  const email = "validemail@domain.com";
  const nonMatchedEmail = "differentemail@domain.com";
  const verification = verifyEmail(email, nonMatchedEmail);
  expect(verification.success).toBe(false);
  expect((verification as ErrorType).error).toBe(
    "Please ensure the emails match."
  );
});

it("should fail if one of the email fields is empty", () => {
  const email = "validemail@domain.com";
  const verificationEmailConfirmEmpty = verifyEmail(email, "");
  expect(verificationEmailConfirmEmpty.success).toBe(false);
  expect((verificationEmailConfirmEmpty as ErrorType).error).toBe(
    "Please fill out the email fields."
  );

  const verificationEmailEmpty = verifyEmail("", email);
  expect(verificationEmailEmpty.success).toBe(false);
  expect((verificationEmailEmpty as ErrorType).error).toBe(
    "Please fill out the email fields."
  );

  const verificationBothEmpty = verifyEmail("", "");
  expect(verificationBothEmpty.success).toBe(false);
  expect((verificationBothEmpty as ErrorType).error).toBe(
    "Please fill out the email fields."
  );
});

it("should pass if the emails match and the format is valid", () => {
  const email = "validemail@domain.com";
  const verification = verifyEmail(email, email);
  expect(verification.success).toBe(true);
});
