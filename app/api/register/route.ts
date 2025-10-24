interface RegisterRequestBody {
  firstName : string;
  surname: string;
  email: string;
  password: string;
}

export const POST = async function (request: Request): Promise<Response> {
  try {
    const { firstName, surname, email, password }: RegisterRequestBody =
      await request.json();
    if (!firstName)
      return Response.json(
        { message: "All fields are required!" },
        { status: 400 }
      );

    console.log(firstName, surname, email, password, "signed up 😒");

    // You MUST return a Response
    return Response.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Registration failed" }, { status: 500 });
  }
};
