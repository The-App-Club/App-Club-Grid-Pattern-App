import {createRoot} from 'react-dom/client';
import {css} from '@emotion/css';
import '@fontsource/inter';
import './styles/index.scss';
const App = () => {
  return (
    <div
      className={css`
        max-width: 800px;
        margin: 1rem auto 0;
        padding: 1rem;
        display: grid;
        grid-auto-flow: dense;
        grid-template-columns: repeat(
          auto-fill,
          minmax(clamp(8rem, 30%, 30rem), 1fr)
        );
        gap: 1rem;
        .item {
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1px solid;
          font-size: 4rem;
          width: 100%;
          min-height: 20vmin;
          @media (max-width: 768px) {
            min-height: calc(20vmin * 1.618);
          }
        }
        .portrait {
          grid-row-end: span 2;
          @media (max-width: 768px) {
          }
        }
        .landscape {
          grid-column-end: span 2;
        }
      `}
    >
      <div className="item div1">1 </div>
      <div className="item div2">2 </div>
      <div className="item portrait div3">3 </div>
      <div className="item landscape div4">4 </div>
      <div className="item landscape div5">5 </div>
      <div className="item div6">6 </div>
      <div className="item portrait div7">7 </div>
      <div className="item landscape div8">8 </div>
      <div className="item div9">9 </div>
      <div className="item portrait div10">10 </div>
      <div className="item landscape div11">11 </div>
      <div className="item div12">12 </div>
    </div>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
