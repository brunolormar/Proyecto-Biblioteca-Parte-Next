import React from "react";
import { NextUIProvider } from "@nextui-org/react";
import "./globals.css";
import { Providers } from "./providers";
import { AuthProvider } from "@/app/context/auth";
  
export default function Rootlayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <html lang="en" className='light'>
            <body>
              <AuthProvider>
                <Providers>
                  <NextUIProvider>
                    { children }
                  </NextUIProvider>
                </Providers>
              </AuthProvider>
            </body>
        </html>
    );
  }
