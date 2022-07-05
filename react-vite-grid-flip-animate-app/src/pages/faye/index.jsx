import {css} from '@emotion/css';
import {Link} from 'react-router-dom';
import {Layout} from '../../layouts/defaults';
import {Grid} from '../../components/Grid';
import {Item} from '../../components/Item';
import {Spacer} from '../../components/Spacer';
import {Outlet} from 'react-router-dom';
const Faye = () => {
  return (
    <Layout>
      <Spacer />
      <h2>{'Faye'}</h2>
      <Spacer height="0.5rem" />
      <div
        className={css`
          display: flex;
          justify-content: space-around;
          align-items: center;
          gap: 3rem;
        `}
      >
        <Link to={'/spike'}>{'spike'}</Link>
        <Link to={'/'}>{'cowboy-bebop'}</Link>
        <Link to={'/jet'}>{'jet'}</Link>
      </div>
      <Spacer />
      <Outlet />
    </Layout>
  );
};

export {Faye};
