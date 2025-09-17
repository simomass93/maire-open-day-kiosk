import React from 'react';

interface HeaderProps {
    title?: string;
    logoVariant?: 'default' | 'fondazione' | 'thismaire' | 'fondazione-mare';
    theme?: 'light' | 'dark';
    logoSize?: string;
}

const Header: React.FC<HeaderProps> = ({
    title,
    logoVariant = 'default',
    theme = 'dark',
    logoSize,
}) => {
    const textColor = theme === 'light' ? 'text-[#0A192F]' : 'text-white';
    let logoSrc = '/images/logo-maire.png';
    let finalSize = logoSize || "h-10"; // default size

    if (logoVariant === 'fondazione') {
        logoSrc = '/images/logo-fondazione.png';
    } else if (logoVariant === 'thismaire') {
        logoSrc = '/images/logo-this-maire.png';
        finalSize = logoSize || "h-20"; // bigger logo by default for "thismaire"
    } else if (logoVariant === 'fondazione-mare') {
        logoSrc = '/images/fondazione-mare.png';
    }

    return (
        <header className={`relative w-full p-8 flex items-center justify-between ${textColor}`}>
            <img src={logoSrc} alt={`${logoVariant} Logo`} className={`${finalSize} w-auto`} />
            {title && <h1 className="text-4xl font-black absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">{title}</h1>}
            <div className="w-12 h-12"></div>
        </header>
    );
};

export default Header;