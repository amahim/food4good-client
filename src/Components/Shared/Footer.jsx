import React from 'react';

const Footer = () => {
    return (
        <div className='pt-10 pb-5'>
            <div className='  w-[90%] mx-auto rounded-2xl  bg-gradient-to-r from-[#ee6352] to-[#e03119] ... '>
            <div>
                <p className='font-bold text-2xl md:text-3xl lg:text-6xl text-center text-white py-5'>Join the <span className='text-[#262522]'>Donation</span> And <br/>
                <span className='text-[#262522]'>Subscribe</span> now!</p>
                
            </div>
            <div className="py-5 w-3/5  text-center flex mx-auto join ">
              <input
                type="email"
                name="email"
                id=""
                placeholder="Enter email"
                className="w-full join-item bg-[#ffffff]  rounded-xl border-2 border-[#262522] px-4 py-2 "
              />
              <button className="join-item  text-white btn bg-[#262522] border-none rounded-xl">
                Send
              </button>
            </div>
            
        </div>
        </div>
    );
};

export default Footer;