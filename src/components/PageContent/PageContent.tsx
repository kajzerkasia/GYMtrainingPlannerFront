interface PageContentProps {
    title: string;
    children: any;
}

const PageContent = ({ title, children }: PageContentProps) => (
    <div>
        <h1>{title}</h1>
        {children}
    </div>
);

export default PageContent;