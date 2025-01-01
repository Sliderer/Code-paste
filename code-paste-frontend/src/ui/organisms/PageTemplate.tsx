import React from 'react';
import Header from "./Header";

const PageTemplate = ({page}: {page: Function}) => {
    return <div>
        <Header/>
        {page()}
    </div>
}

export default PageTemplate;