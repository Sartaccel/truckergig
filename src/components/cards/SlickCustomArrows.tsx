interface navProps {
    className?: string,
    style?: object,
    onClick?: () => void
}

export const Previous: React.FC<navProps> = ({ className, style, onClick }) => {
    return (
        <div className={className} style={{ ...style }} onClick={onClick}>
            <i className="bi bi-arrow-left-short"></i>
        </div>
    );
}

export const Next: React.FC<navProps> = ({ className, style, onClick }) => {
    return (
        <div className={className} style={{ ...style }} onClick={onClick}>
            <i className="bi bi-arrow-right-short"></i>
        </div>
    );
}