import { Box, Container } from "@mui/material";
import { useState } from "react";
import EmailPrompt from "@/components/EmailPrompt";
import ToDoForm from "@/components/ToDoForm";
import ToDoTable from "@/components/ToDoTable";
import { UserType } from "@/lib/types";

export default function Home() {
  const [user, setUser] = useState<UserType | null>(null);

  return (
    <>
      <main style={{ backgroundColor: "#EAEEF0" }}>
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            height: "100%",
            minHeight: "100vh",
            flexDirection: "column",
          }}
        >
          {user ? (
            <Box sx={{ m: "auto", textAlign: "center" }}>
              <ToDoForm user={user} />
              <ToDoTable email={user.email} />
            </Box>
          ) : (
            <EmailPrompt setUser={setUser} />
          )}
        </Container>
      </main>
    </>
  );
}
