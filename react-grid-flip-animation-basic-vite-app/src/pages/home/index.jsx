import {css} from '@emotion/css';
import {Link} from 'react-router-dom';
import {Search} from '../../components/Search';

const HomePage = () => {
  return (
    <section
      className={css`
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        h2 {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0;
          padding: 1rem 0;
        }
      `}
    >
      <h2>HomePage</h2>
      <Search />
    </section>
  );
};

export {HomePage};
