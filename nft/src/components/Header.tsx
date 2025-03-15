import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isAccount, setIsAccount] = useState(
    sessionStorage.getItem('address') || ''
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAccount(sessionStorage.getItem('address') || '');
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <header style={{ background: '#333', padding: '10px', color: 'white' }}>
      <nav style={{ display: 'flex', gap: '20px' }}>
        {isAccount ? (
          <>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
              홈
            </Link>
            <Link to="/nfts" style={{ color: 'white', textDecoration: 'none' }}>
              NFTs
            </Link>
            <Link to="/mint" style={{ color: 'white', textDecoration: 'none' }}>
              Mint
            </Link>
          </>
        ) : (
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
            홈
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
