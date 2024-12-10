const PageTemplate = ({page}: {page: React.Component}) => {
    return <div>
        <p>Hi</p>
        {page.render()}
    </div>
}

export default PageTemplate;