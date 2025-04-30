import './index.css';
import Body from './components/Body.js';
import { Provider } from 'react-redux';
import appStore from './utils/appStore.js';
import { useSelector } from 'react-redux';

// Create a wrapper component to apply theme
const AppContent = () => {
  const darkMode = useSelector(store => store.theme.darkMode);
  
  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
        <Body />
      </div>
    </div>
  );
};

function App() {
  return (
    <Provider store={appStore}>
      <AppContent />
    </Provider>
  );
}

export default App;



