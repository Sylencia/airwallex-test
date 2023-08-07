type SuccessType = {
  success: true;
};

export type ErrorType = {
  success: false;
  error: string;
};

type VerifyResponseType = SuccessType | ErrorType;

export const verifyEmail = (
  email: string | undefined,
  emailConfirm: string | undefined
): VerifyResponseType => {
  if (!email || !emailConfirm) {
    return {
      success: false,
      error: "Please fill out the email fields.",
    };
  }

  // Confirm emails match first
  if (email !== emailConfirm) {
    return {
      success: false,
      error: "Please ensure the emails match.",
    };
  }

  // confirm email is in basic email format (<something>@<domain>.<tld>)
  // In an actual full scale system, this check should rely on regex solution that conforms to fit
  // more obscure use cases and the multiple RFCs relating to email format.
  const regex = new RegExp(/^.+@.+\..+$/);
  if (regex.test(email)) {
    return {
      success: true,
    };
  } else {
    return {
      success: false,
      error: "Please ensure your email is valid.",
    };
  }
};
