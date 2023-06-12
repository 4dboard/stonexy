"use client";
import React from "react";
import Link from "next/link";
import "../styles/globals.css";
import client from "../apolloClient/index";
import {ApolloProvider} from "@apollo/client";

export default function Layout({children}: { children: React.ReactNode }) {
    return (
        <html>
        <head>
            <title>Keystone + Next.js</title>
            <meta
                name="description"
                content="Example to use Keystone APIs in a Next.js server environment."
            />
            <link rel="icon" href="/favicon.ico"/>
        </head>
        <body>
        <div className="container">
            <div
                style={{
                    padding: "0 2rem",
                }}
            >
                <header>
                    <nav>
                        <ul>
                            <li>
                                <Link href="/">Home</Link>
                            </li>
                            <li>
                                <Link href="/formpage">Formpage</Link>
                            </li>
                        </ul>
                    </nav>
                </header>
                <main style={{display: "flex", justifyContent: "center"}}>
                    <ApolloProvider client={client}>{children}</ApolloProvider>
                </main>
            </div>
        </div>
        </body>
        </html>
    );
}
