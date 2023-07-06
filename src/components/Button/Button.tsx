import React from "react";
import Button from "@mui/material/Button";

type TButton = { children: React.ReactNode };
function MyComponent({ children }: TButton) {
  return (
    <Button variant="contained" color="primary">
      {children}
    </Button>
  );
}

export default MyComponent;
