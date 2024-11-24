import moment from "moment";

export default function ChatContact({ contact, categories }) {
  console.log(contact, categories);
  const { image, name, lastMessage, last_activity_time, description } = contact;
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
          <h3 className="text-[1.1rem]">{category?.title}</h3>
          <h3 className="text-[0.9rem]">
            {description
              ? description.length > 20
                ? description.slice(0, 20) + "..."
                : description
              : ""}
          </h3>
        </div>
        <div className="basis-[40%] text-[0.6rem] text-gray-700 flex flex-col items-end justify-end gap-1">
          <p
            className="text-gray-900 rounded-[10px] text-[0.6rem] capitalize"
            style={{
              backgroundColor:
                contact.status === "open" ? "green" : "#ff000090",
              color: "white",
              width: "max-content",
              height: "max-content",
              fontSize: "10px",
              padding: "2px 5px",
            }}
          >
            {contact.status}
          </p>
          {moment(last_activity_time).fromNow()}
        </div>
      </div>
    </div>
  );
}
