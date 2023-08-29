import { useEffect, useState } from 'react';
import Catalog from './components/Catalog';

function App() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize)
  }, []);
  
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      padding: '50px 12px'
    }}>
      <Catalog itemsPerPage={screenWidth <= 850 ? 3 : 6} />
    </div>
  );
}

export default App;
