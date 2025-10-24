"use client";
import { Button } from "../_components/Button";
import signup from "@/actions/signup-action";
import signin from "@/actions/signin-action";
import Link from "next/link";
import { useActionState } from "react";
import { useDispatch } from "react-redux";
// import { RootState } from "@/state/store";
import { login } from "@/state/user/userSlice"; // <--- IMPORT LOGIN ACTION
import { useEffect } from "react"; // <--- IMPORT useEffect
import { useRouter } from "next/navigation"; // <--- IMPORT useRouter

type AuthFormProps = {
  mode: "sign-in" | "sign-up";
};

export default function AuthForm({ mode }: AuthFormProps) {
  const accessType = mode === "sign-up" ? signup : signin;
  const [formState, formAction, isPending] = useActionState(accessType, {
    errors: {},
    user: undefined,
  }); 
  const dispatch = useDispatch(); 
  const router = useRouter();
  console.log(formState.user?.firstName)

  useEffect(() => {
    if (formState.user) {
      // Dispatch login action with user data
      dispatch(login(formState.user));
      // Redirect to the homepage after successful login
      router.push("/");
    }
  }, [formState.user, dispatch, router]);

  return (
    <form
      action={formAction}
      className={`flex flex-col gap-5 z-20 bg-lightRose1 absolute p-10 rounded-[.9rem] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
        mode === "sign-up" ? "mt-7" : ""
      }`}
    >
      {mode === "sign-up" && (
        <>
          <div className="flex flex-col gap-1.5 w-80 text-[17.5px]">
            <label htmlFor="firstname">Enter firstname:</label>
            <input
              className="ring-2 rounded-[.6rem] py-1.5 px-2 text-darkRose2 ring-darkRose2 "
              type="text"
              id="firstname"
              name="firstname"
            />
          </div>
          <div className="flex flex-col gap-1.5 w-80 text-[17.5px]">
            <label htmlFor="surname">Enter surname:</label>
            <input
              className="ring-2 rounded-[.6rem] py-1.5 px-2 text-darkRose2 ring-darkRose2 "
              type="text"
              id="surname"
              name="surname"
            />
          </div>
        </>
      )}

      <div className="flex flex-col gap-1.5 w-80 text-[17.5px]">
        <label htmlFor="email">Enter email:</label>
        <input
          className="ring-2 rounded-[.6rem] py-1.5 px-2 text-darkRose2 ring-darkRose2 "
          type="email"
          id="email"
          name="email"
        />
      </div>
      <div className="flex flex-col gap-1.5 w-80 text-[17.5px]">
        <label htmlFor="password">Enter password:</label>
        <input
          className="ring-2 rounded-[.6rem] py-1.5 px-2 text-darkRose2 ring-darkRose2"
          type="password"
          id="password"
          name="password"
        />
      </div>

      {formState.errors && Object.keys(formState.errors).length > 0 && (
        <ul className="text-rose-500 w-80">
          {Object.entries(formState.errors).map(
            ([field, error]) => error && <li key={field}>{error}</li>
          )}
        </ul>
      )}

      <Button
        className="py-1.5 w-full font-semibold tracking-widest mt-4 ml-auto border-2 border-rose-700 disabled:opacity-50"
        disabled={isPending}
      >
        {isPending
          ? mode === "sign-up"
            ? "Creating account..."
            : "Signing in..."
          : mode === "sign-up"
          ? "Sign up"
          : "Sign in"}
      </Button>
      <p className="mx-auto">
        {mode === "sign-up" ? "Already signed up?" : "Don't have an account?"}{" "}
        <Link
          href={mode === "sign-up" ? "/auth/sign-in" : "/auth/sign-up"}
          className="border-b pb-0.5 border-b-darkRose2 max-w-fit px-0.5 hover:text-darkRose1"
        >
          {mode === "sign-up" ? "Sign in" : "Sign up"}
        </Link>
      </p>
    </form>
  );
}
