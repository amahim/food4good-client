import React from 'react';
import Banner from './Banner';
import YouShareTheySmile from './YouShareTheySmile';
import Faq from './Faq';
import FetchFetFoods from './FetchFetFoods';

const HomeLayout = () => {
    return (
        <div>
            <Banner/>
            <FetchFetFoods/>
            <YouShareTheySmile/>
            <Faq/>
        </div>
    );
};

export default HomeLayout;