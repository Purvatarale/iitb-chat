import { createContext, useContext, useEffect, useState } from "react";
import request from "../utils/request";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../modules/ui/dialog";
import { Button } from "../modules/ui/button";
import { Input } from "../modules/ui/input";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("iitb-user") || "{}");
    if (storedUser.email) {
      setUser(storedUser);
    } else {
      setShow(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const name = formData.get("name");
    try {
      localStorage.setItem("iitb-user", JSON.stringify({ email, name }));
      setShow(false);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <UserContext.Provider value={user}>
      <Dialog open={show}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Welcome to IITB Chat</DialogTitle>
            <DialogDescription>
              Please Enter Name and Email to Continue
            </DialogDescription>
          </DialogHeader>
          <div>
            <form onSubmit={handleLogin} className="flex flex-col gap-2">
              <Input name="email" type="email" placeholder="Enter your Email" />
              <Input name="name" type="text" placeholder="Enter your Name" />
              <Button type={"submit"} className="w-full">
                Login
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
