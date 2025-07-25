"use client";

import {
  Authenticated,
  AuthLoading,
  ConvexReactClient,
  Unauthenticated,
} from "convex/react";
import { ReactNode } from "react";

import { ClerkProvider, SignIn, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        <Authenticated>{children}</Authenticated>

        <Unauthenticated>
          <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 px-4 text-center">
            <h1 className="mb-4 text-3xl font-bold text-gray-800">
              🚫 Access Denied
            </h1>
            <p className="mb-6 text-gray-700">
              You shall not pass... <br /> Please log in to continue.
            </p>
            <div className="rounded-xl bg-white p-6 shadow-md">
              <SignIn routing="hash" />
            </div>
          </div>
        </Unauthenticated>

        <AuthLoading>
          <div className="flex min-h-screen animate-pulse flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-indigo-100 px-4 text-center text-gray-800">
            <h1 className="mb-2 text-2xl font-semibold">
              🕵️‍♂️ Verifying Identity...
            </h1>
            <p className="text-gray-600">Our secret service is on it.</p>
          </div>
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
