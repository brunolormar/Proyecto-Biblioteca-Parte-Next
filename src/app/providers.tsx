'use client'

import React from "react";
// app/providers.tsx

import { AuthProvider } from "./context/auth";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
