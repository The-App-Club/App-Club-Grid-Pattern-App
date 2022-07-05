import {Layout} from '../../layouts/defaults';
import {css} from '@emotion/css';
import {Link, Outlet} from 'react-router-dom';
import {Spacer} from '../../components/Spacer';
const Edward = () => {
  return (
    <Layout>
      <Spacer />
      <h2>{'Edward'}</h2>
      <Spacer height="0.5rem" />
      <div
        className={css`
          display: flex;
          justify-content: space-around;
          align-items: center;
          gap: 3rem;
          margin-bottom: 1rem;
        `}
      >
        <Link to={'/jet'}>{'jet'}</Link>
        <Link to={'/'}>{'cowboy-bebop'}</Link>
        <Link to={'/spike'}>{'spike'}</Link>
      </div>
      <Spacer />
      <Outlet />
    </Layout>
  );
};

export {Edward};
