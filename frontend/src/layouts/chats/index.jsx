import React from 'react'
import GlobalLayout from '../global';
import Sidebar from '../../components/sidebar';
import Navbar from '../../components/navbar';

const ChatLayout = ({children}) => {
  return (
    <GlobalLayout>
      <section className='w-screen h-screen border-2 border-red-100 overflow-hidden flex flex-col'>
          <Navbar />
          <div className="flex flex-row gap-2 p-2 h-[90vh] max-h-[90vh] border-2 border-orange-100">
              <div className='basis-[23%] w-full h-[88vh] max-h-[88vh] overflow-y-scroll'>
                  <Sidebar />
              </div>
              <div className=' border-2 border-green-100 basis-[75%] w-full h-[88vh] max-h-[88vh] overflow-y-scroll'>
                  {children}
              </div>
          </div>
      </section>
    </GlobalLayout>
  )
}

export default ChatLayout