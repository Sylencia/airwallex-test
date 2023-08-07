type SuccessState = string;

type ErrorState = {
  errorMessage: string;
};

type Response = SuccessState | ErrorState;

export const submitForm = async (name: string, email: string) => {
  const response = await fetch(
    "https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
      }),
    }
  );

  const res: Response = await response.json();

  if (response.ok) {
    return Promise.resolve();
  } else {
    // Ideally we would build up a proper dictionary of errors to handle here,
    // and the backend would just return us a code to interpret.
    return Promise.reject("Username already in use");
  }
};
