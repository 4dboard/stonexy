"use client";
import React, {useState} from "react";
import {gql, useMutation} from "@apollo/client";

const CreateUserQuery = gql`
  mutation Mutation($data: UserCreateInput!) {
    createUser(data: $data) {
      id
      name
    }
  }
`;

const FormPage = () => {
    const [name, setName] = useState("");
    const [createuser, {data, error, loading}] = useMutation(CreateUserQuery);

    const SubmitHandler = (e: any) => {
        e.preventDefault();
        createuser({
            variables: {
                data: {
                    name: name,
                },
            },
            refetchQueries: [
                {
                    query: gql`
            query Query {
              users {
                name
                id
              }
            }
          `,
                },
            ],
        });
    };

    return (
        <form onSubmit={SubmitHandler}>
            <div>
                <label htmlFor="name">User Name</label>
                <input
                    type="text"
                    id="name"
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <button type="submit">submit</button>
            <h1> {data ? "user create" : " "}</h1>
        </form>
    );
};

export default FormPage;
