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
import request from "../../utils/request";
import { useUser } from "../../context/user.context";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ chatCategories }) => {
  const [search, setSearch] = React.useState("");
  const [contactsData, setContactsData] = React.useState([]);
  const user = useUser();
  const router = useNavigate();

  // React.useEffect(() => {
  //   if (search) {
  //     setContactsData(
  //       contacts.filter((contact) =>
  //         contact.name.toLowerCase().includes(search.toLowerCase())
  //       )
  //     );
  //   } else {
  //     setContactsData(contacts);
  //   }
  // }, [search]);

  const fetchChats = async () => {
    const { data } = await request.get(
      `/api/conversations/get-chats/${user.email}`
    );
    setContactsData(data);
  };

  const [categoryDescription, setCategoryDescription] = React.useState("");
  const [openModal, setOpenModal] = React.useState(false);

  const handleCategoryClick = async (category) => {
    if (!categoryDescription) {
      alert("Please enter a description for your chat");
      return;
    }

    if (categoryDescription.length > 20 || categoryDescription.length < 5) {
      alert("Description should be between 5 and 50 characters");
      return;
    }

    const { data } = await request.post(`/api/conversations/create-chat`, {
      category: category.id,
      email: user.email,
      name: user.name,
      description: categoryDescription,
    });

    fetchChats();
    setCategoryDescription("");
    setOpenModal(false);
    if (data._id) {
      router(`/${data._id}`);
    }
  };

  React.useEffect(() => {
    if (user?._id) fetchChats();
  }, [user]);

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
            <Link to={`/${contact._id}`} key={contact.id}>
              <ChatContact contact={contact} categories={chatCategories} />
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
        <Dialog open={openModal} onOpenChange={(e) => setOpenModal(e)}>
          <DialogTrigger asChild>
            <Button className="bg-blue-300 hover:bg-blue-200 rounded-full aspect-square fixed w-[50px] h-[50px] left-[24vw] bottom-5">
              <Plus />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Start a new Chat</DialogTitle>
              <DialogDescription>Select a category to start.</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-2 p-2">
              <div>
                <Input
                  onChange={(e) => {
                    setCategoryDescription(e.target.value);
                  }}
                  placeholder="Please briefly describe your issue in 5 to 50 characters"
                  value={categoryDescription}
                />
              </div>
              {chatCategories.map((category) => {
                return (
                  <div
                    className="flex flex-row items-center p-2 gap-2 rounded bg-[#00000110] hover:bg-[#00000120] cursor-pointer"
                    key={category.id}
                    onClick={() => {
                      handleCategoryClick(category);
                    }}
                  >
                    <img src={category.icon} className="w-10 h-10" />
                    <div className="flex flex-col">
                      <p className="font-bold">{category.title}</p>
                      <p className="text-sm text-gray-500">
                        {category.description}
                      </p>
                    </div>
                  </div>
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
