import React, { useEffect } from "react";

import { useUser } from "@clerk/clerk-react";

function SavetoDB() {
  const { user } = useUser();
  console.log(user.fullName);

  useEffect(() => {
    if (user) {
      const newUser = {
        userId: user.id,
        name: user.fullName,
        email: user.emailAddresses[0].emailAddress,
        avatar: user.imageUrl,
      };

      fetch("http://localhost:4000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      })
        .then((resp) => resp.json())
        .then((data) => console.log("User Saved", data))
        .catch((err) => console.log("User not Saved", err));
    }
  }, [user]);

  return null;
}

export default SavetoDB;
