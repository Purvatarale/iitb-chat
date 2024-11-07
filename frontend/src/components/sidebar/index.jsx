import { Plus } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import arrow from "../../assets/images/arrow.svg";
import { Button } from "../../modules/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../modules/ui/dialog";
import { Input } from "../../modules/ui/input";
import ChatContact from "../chat-contact";
import { contacts } from "../../dump/data";

const Sidebar = ({ chatCategories }) => {
  const [search, setSearch] = React.useState("");
  const [contactsData, setContactsData] = React.useState([]);

  //   React.useEffect(() => {
  //     if (search) {
  //       setContactsData(
  //         contacts.filter((contact) =>
  //           contact.name.toLowerCase().includes(search.toLowerCase())
  //         )
  //       );
  //     } else {
  //       setContactsData(contacts);
  //     }
  //   }, [search]);

  return (
    <div className="flex flex-col gap-4 p-2 rounded pb-[3vh] relative h-full">
      {contactsData.length > 0 && (
        <Input
          placeholder="Search"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      )}
      {contactsData.length > 0 &&
        contactsData.map((contact) => {
          return (
            <Link to={`/${contact.chatId}`} key={contact.id}>
              <ChatContact contact={contact} />
            </Link>
          );
        })}

      {!contactsData.length && (
        <>
          <div className="mt-[5vh] text-center p-5 h-[]">
            Please start your first conversation
          </div>
          <img
            src={arrow}
            className="rotate-[75deg] opacity-[0.2] absolute bottom-[25vh]"
          />
        </>
      )}

      {chatCategories.length > 0 && (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-300 hover:bg-blue-200 rounded-full aspect-square absolute w-[50px] h-[50px] right-2 bottom-2">
              <Plus />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Start a new Chat</DialogTitle>
              <DialogDescription>Select a category to start.</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-2 p-2">
              {chatCategories.map((category) => {
                return (
                  <Link to={`/${category.id}`} key={category.id}>
                    <div className="flex flex-row items-center p-2 gap-2 rounded bg-[#00000110] hover:bg-[#00000120] cursor-pointer">
                      <img src={category.icon} className="w-10 h-10" />
                      <div className="flex flex-col">
                        <p className="font-bold">{category.title}</p>
                        <p className="text-sm text-gray-500">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Sidebar;
