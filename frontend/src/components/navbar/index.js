import {Avatar, AvatarFallback, AvatarImage} from '../../modules/ui/avatar';

export default function Navbar() {
    return (
        <nav className="h-[8vh] p-2 flex flex-row justify-between items-center">
            <div className="text-2xl font-bold">My Chats</div>
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </nav>
    )
}