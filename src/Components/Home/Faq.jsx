import React from 'react';

const Faq = () => {
    return (
        <div className='w-[90%] mx-auto mt-10'>
            <section>
	<div className="container flex flex-col justify-center  mx-auto">
		<div className='flex justify-center'>
        <p className=" text-white bg-[#262522] rounded-2xl text-center w-48 ">How We Works</p>
        </div>
		<h2 className="mt-5 lg:text-4xl text-[#262522] mb-8 md:text-3xl font-bold leading-none text-center text-2xl">Frequently Asked Questions</h2>
		<div className="flex flex-col divide-y sm:px-8 lg:px-12 xl:px-32 dark:divide-gray-300">
			<details open="">
				<summary className="py-2 outline-none cursor-pointer focus:underline">What is the purpose of this website?</summary>
				<div className="px-4 pb-4">
					<p>Our website is a Community Food Sharing and Surplus Reduction Platform. It connects people who want to donate excess food with those in need, helping to minimize food waste and hunger.</p>
				</div>
			</details>
			<details open="">
				<summary className="py-2 outline-none cursor-pointer focus:underline">How can I donate food?</summary>
				<div className="px-4 pb-4">
					<p>To donate food, simply log in and go to the Add Food page. Fill out the form with details like food name, quantity, pickup location, expiration date, and additional notes. Once submitted, your food will appear in the Available Foods section for others to view.</p>
				</div>
			</details>
			<details open="">
				<summary className="py-2 outline-none cursor-pointer focus:underline">Can I request food even if I'm not logged in?</summary>
				<div className="px-4 pb-4 space-y-2">
					<p>No, you need to be logged in to request food. If you click the View Details button on an available food item without logging in, you'll be redirected to the login page.</p>
				</div>
			</details>
            <details open="">
				<summary className="py-2 outline-none cursor-pointer focus:underline">What happens when I request food?</summary>
				<div className="px-4 pb-4 space-y-2">
					<p>When you request food, the item is removed from the Available Foods list and added to your My Food Requests page. The food status changes to “requested,” and the donor will be notified.</p>
				</div>
			</details>
			<details open="">
				<summary className="py-2 outline-none cursor-pointer focus:underline">Is my data secure on this platform?</summary>
				<div className="px-4 pb-4 space-y-2">
					<p>
                    Yes, we prioritize your data security. All sensitive information is secured using environment variables, and user authentication is handled through Firebase with secure JWT tokens for private routes.</p>
				</div>
			</details>
			
		</div>
	</div>
</section>
        </div>
    );
};

export default Faq;