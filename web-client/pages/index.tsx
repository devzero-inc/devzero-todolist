import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import EmailPrompt from "@/components/EmailPrompt";
import ToDoForm from "@/components/ToDoForm";
import ToDoTable from "@/components/ToDoTable";
import { UserType } from "@/lib/types";
import Head from "next/head";

export default function Home() {
  const [user, setUser] = useState<UserType | null>(null);

  // {
  //   email: "debo@example.com",
  //   id: "99f5a6a6-b31e-11ed-a595-0242ac130002",
  //   name: "debo",
  // }

  return (
    <>
      <Head>
        <title>To do list</title>
        <meta name="description" content="To do list" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main style={{ backgroundColor: "#EAEEF0" }}>
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            flexDirection: "column",
          }}
        >
          {user ? (
            <>
              <ToDoForm user={user} />
              <ToDoTable email={user.email} />
            </>
          ) : (
            <EmailPrompt setUser={setUser} />
          )}
        </Container>
      </main>
    </>
  );
}
