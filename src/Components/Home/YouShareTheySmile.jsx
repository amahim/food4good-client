


import s1 from '../../assets/s1.jpg'
import s2 from '../../assets/s2.jpg'
import s3 from '../../assets/s3.jpg'
import s4 from '../../assets/s4.jpg'
import s5 from '../../assets/s5.jpg'

const YouShareTheySmile = () => {
    return (
        <div className='py-5 px-5 w-[90%] mx-auto border-2 border-[#2625229d] rounded-xl mt-10'>
            {/* header */}
            <div className='flex justify-center'>
                <p className='text-white bg-[#262522] rounded-2xl text-center w-48'>You Share They Smile</p>
            </div>
            <div className='mt-5'>
            <div className="relative flex items-center justify-center w-full dark:text-gray-900">
	<div className="flex items-center justify-start w-full h-full gap-6 py-4 mx-auto overflow-auto lg:gap-8">
		<div className="relative flex flex-shrink-0 w-full sm:w-auto">
			<img className="object-cover object-center dark:bg-gray-500 h-96 aspect-square" src={s1} alt="" />
		</div>
		<div className="relative flex flex-shrink-0 w-full sm:w-auto">
			<img className="object-cover object-center dark:bg-gray-500 h-96 aspect-square" src={s2} alt="" />
		</div>
		<div className="relative flex flex-shrink-0 w-full sm:w-auto">
			<img className="object-cover object-center dark:bg-gray-500 h-96 aspect-square" src={s3} alt="" />
		</div>
		<div className="relative flex flex-shrink-0 w-full sm:w-auto">
			<img className="object-cover object-center dark:bg-gray-500 h-96 aspect-square" src={s4} alt="" />
		</div>
		<div className="relative flex flex-shrink-0 w-full sm:w-auto">
			<img className="  object-cover object-center dark:bg-gray-500 h-96 aspect-square" src={s5} alt=""/>
		</div>
		
	</div>
	
</div>
            </div>
        </div>
    );
};

export default YouShareTheySmile;