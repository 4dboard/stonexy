"use client";
import React from "react";

import {gql, useQuery} from "@apollo/client";

const getUser = gql`
  query Query {
    users {
      name
      id
    }
  }
`;

export default function HomePage() {
    const {loading, error, data} = useQuery(getUser);

    if (error) return `Error! ${error.message}`;
    console.log(loading);
    return (
        <>
            {loading ? (
                "loading"
            ) : (
                <section>
                    <h1>Keystone 🤝 Next.js</h1>
                    <div>
                        <ol>
                            {!loading &&
                                data?.users.map((u: any) => {
                                    return (
                                        <li key={u.id}>
                                            <span>{u.name} </span>
                                        </li>
                                    );
                                })}
                        </ol>
                    </div>
                </section>
            )}
        </>
    );
}
