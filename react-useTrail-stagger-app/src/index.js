import {createRoot} from 'react-dom/client';
import {css} from '@emotion/css';
import {StaggerText} from './components/StaggerText';
import '@fontsource/kaushan-script';
import './index.scss';
import './index.scss';

const App = () => {
  return (
    <div
      className={css`
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
      `}
    >
      {[...Array(1)].map((n, index) => {
        return <StaggerText />;
      })}
    </div>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
