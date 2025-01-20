import React from "react";
import { NextUIProvider } from "@nextui-org/react";
import "./globals.css";
import { Providers } from "./providers";
  
export default function Rootlayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <html lang="en" className='light'>
            <body>
              {/* <Providers> */}
                <NextUIProvider>
                  { children }
                </NextUIProvider>
              {/* </Providers> */}
            </body>
        </html>
    );
  }
