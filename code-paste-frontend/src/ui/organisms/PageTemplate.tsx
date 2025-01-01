import React from 'react';
import Header from "./Header";

const PageTemplate = ({page}: {page: React.Component}) => {
    return <div>
        <Header/>
        {page.render()}
    </div>
}

export default PageTemplate;