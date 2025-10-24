interface RegisterRequestBody {
  email: string;
  password: string;
}

export const POST = async function (request: Request): Promise<Response> {
  try {
    const { email, password }: RegisterRequestBody = await request.json();

    console.log(email, password, "signed up 😒");

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
