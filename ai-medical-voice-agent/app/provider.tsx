"use client";
import React, { useContext, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { User } from "@clerk/nextjs/server";
import { UserDetailContext } from "@/context/UserDetailContext";

export type UserDetail = {
  name: string;
  email: string;
  credits: number;
};

function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useUser();
  // const [UserDetail, setUserDetail] = useState<UserDetail | undefined>();
  const [UserDetail, setUserDetail] = useState<any>();

  useEffect(() => {
    CreateNewUser();
  }, [user]);

  const CreateNewUser = async () => {
    const result = await axios.post("/api/users");
    console.log(result.data);
    setUserDetail(result.data);
  };

  return (
  <div>
    <UserDetailContext.Provider value={{UserDetail, setUserDetail}}>
    {children}
    </UserDetailContext.Provider>
    </div>
    );
}

export default Provider;
