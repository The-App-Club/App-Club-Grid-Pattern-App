import {createRoot} from 'react-dom/client';
import {css} from '@emotion/css';
import './styles/index.scss';
import {LinearPartitionGrid} from './components/LinearPartitionGrid';

const App = () => {
  return (
    <div
      className={css`
        width: 100%;
        padding: 1rem;
        display: flex;
        gap: 1rem;
        @media (max-width: 768px) {
          flex-direction: column;
          padding: 1rem;
        }
      `}
    >
      <div
        className={css`
          width: 33.333%;
          @media (max-width: 768px) {
            width: 100%;
          }
        `}
      >
        <LinearPartitionGrid padding={16} rowHeight={150} />
      </div>
      <div
        className={css`
          width: 33.333%;
          @media (max-width: 768px) {
            display: none;
          }
        `}
      >
        <LinearPartitionGrid padding={16} rowHeight={300} />
      </div>
      <div
        className={css`
          width: 33.333%;
          @media (max-width: 768px) {
            display: none;
          }
        `}
      >
        <LinearPartitionGrid padding={16} rowHeight={200} />
      </div>
    </div>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
