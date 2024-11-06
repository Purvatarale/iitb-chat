import React from 'react'
import { contacts } from '../../dump/data'
import ChatContact from '../chat-contact'
import { Input } from '../../modules/ui/input';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [search, setSearch] = React.useState('');
  const [contactsData, setContactsData] = React.useState(contacts);

  React.useEffect(() => {
    if(search){
      setContactsData(contacts.filter(contact => contact.name.toLowerCase().includes(search.toLowerCase())));
    }else{
      setContactsData(contacts);
    }
  }, [search])
  
  return (
    <div className='flex flex-col gap-4 p-2 rounded'>
        <Input placeholder='Search' onChange={(e)=>{
          setSearch(e.target.value);
        }}/>
        {contactsData.map(contact => {
            return (
              <Link to={`/${contact.chatId}`} key={contact.id}>
                <ChatContact contact={contact}/>
              </Link>
          )
        })}
    </div>
  )
}

export default Sidebar