import React, { useContext } from 'react';
import LottieBanner from '../../assets/LottieBanner.json'
import Lottie from "lottie-react";
import { AuthContext } from '../Provider/AuthProvider';
import { Link } from 'react-router-dom';

const Banner = () => {
    const {user} = useContext(AuthContext)
    return (
       <div>
            <div className='flex md:justify-around justify-center items-center md:flex-row  flex-col w-[90%] mx-auto rounded-2xl  bg-gradient-to-r from-[#ee6352] to-[#e03119] ... md:pt-0 pt-10'>
                <div className='space-y-5 flex flex-col md:items-start items-center'>
                    <p className='md:text-start text-center text-2xl md:text-3xl lg:text-4xl text-white font-bold'><span className='text-[#262522]'>Share</span> Food , Spread <span className='text-[#262522]'>Smiles!</span><br/>
                    Turn Your <span className='text-[#262522]'>Extra</span><br />Into Someone's <span className='text-[#262522]'>Meal</span></p>
                    {
                        user && user?.email ? 
                        (
                            <Link to="/addFood"  className='btn bg-[#262522] text-white border-none'>
                        Donate Now
                    </Link>
                        ) : (
                            <Link to="/login"  className='btn bg-[#262522] text-white border-none'>
                            Join Now
                        </Link>
                        )
                    }
                    
                </div>
                <div >
                    <Lottie animationData={LottieBanner} className="h-64 md:h-92 lg:h-96" ></Lottie>
                </div>
            </div>
       </div>
    );
};

export default Banner;