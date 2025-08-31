"use client";

import { Button } from "@/components/ui/button";
import { auth, googleProvider } from "@/lib/firebase";
import { useUserStore } from "@/states/useUserStore";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { FcGoogle, FcPortraitMode } from "react-icons/fc";
import { SiGooglegemini } from "react-icons/si";

export default function SignIn() {
  const { push } = useRouter();
  const { setAuthUser } = useUserStore();

  const signInWithGoogle = async () => {
    try {
      const response = await signInWithPopup(auth, googleProvider);
      setAuthUser(response.user);
      push("/");
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 h-screen flex items-center justify-center">
      <div className="flex flex-col gap-4 items-center">
        <div className="flex items-center gap-x-4">
          <FcPortraitMode size={80} />
          <SiGooglegemini size={70} className="text-sky-500 rotate-" />
        </div>
        <h1 className="text-4xl font-semibold text-center">
          Welcome to DZ-AI 👋
        </h1>
        <p>Please sign in using Google</p>
        <Button
          onClick={signInWithGoogle}
          variant={"default"}
          className="w-fit flex gap-2 items-center rounded-full cursor-pointer"
        >
          <FcGoogle size={20} />
          <p>Sign in with Google</p>
        </Button>
        <small className="block pt-5 dark:text-gray-400 text-gray-500 font-medium">
          Powered by gemini
        </small>
      </div>
    </div>
  );
}
