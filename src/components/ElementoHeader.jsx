import React, { useEffect, useRef, useState } from 'react';
import '../css/header.css'; // Asegúrate de importar tu archivo CSS

const Header = ({ titulo }) => {
  const [isOverflow, setIsOverflow] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const headerElement = headerRef.current;
    if (headerElement.scrollWidth > headerElement.clientWidth) {
      setIsOverflow(true);
    } else {
      setIsOverflow(false);
    }
  }, [titulo]);

  return (
    <div className="header-wrapper" ref={headerRef}>
      <h4 className={`header-text ${isOverflow ? 'marquee' : ''}`}>
        {titulo}
      </h4>
    </div>
  );
};

export default Header;
