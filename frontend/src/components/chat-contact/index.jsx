export default function ChatContact({ contact }) {
    const {image, name, lastMessage, lastMessageTime} = contact;
    return (
        <div className="flex flex-row gap-2 items-center py-1 px-2 hover:bg-[#00000110] transition-all cursor-pointer rounded">
            <img src={image} alt={name} className="rounded-full aspect-square w-[50px]" />
            <div className="flex flex-row justify-between items-center w-full">
                <div className="basis-[60%] max-w-[60%]">
                    <h3>{name}</h3>
                    <p className="text-gray-500">{lastMessage.length>10?`${lastMessage.slice(0,10)}...`:lastMessage}</p>
                </div>
                <div className="basis-[30%] text-sm text-gray-300">{lastMessageTime}</div>
            </div>

          
        </div>
    );
};