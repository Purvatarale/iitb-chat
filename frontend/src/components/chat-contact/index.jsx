export default function ChatContact({ contact, categories }) {
  console.log(contact, categories);
  const { image, name, lastMessage, last_activity_time } = contact;
  const category = categories.find(
    (category) => category.id === contact.category
  );
  return (
    <div className="flex flex-row gap-2 items-center py-1 px-2 hover:bg-[#00000110] transition-all cursor-pointer rounded">
      <img
        src={category?.icon}
        alt={category?.title}
        className="rounded-full aspect-square w-[50px]"
      />
      <div className="flex flex-row justify-between items-center w-full">
        <div className="basis-[60%] max-w-[60%]">
          <h3>{category?.title}</h3>
          <p
            className="text-gray-500 rounded-[100px] p-1 text-sm capitalize"
            style={{
              backgroundColor:
                contact.status === "open" ? "green" : "#ff000090",
              color: "white",
              width: "max-content",
              height: "max-content",
              fontSize: "10px",
            }}
          >
            {contact.status}
          </p>
        </div>
        <div className="basis-[30%] text-sm text-gray-300">
          {new Date(last_activity_time).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}
