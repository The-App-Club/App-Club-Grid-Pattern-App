import {Layout} from '../../layouts/defaults';
import {Link, Outlet} from 'react-router-dom';
import {css} from '@emotion/css';
import {Spacer} from '../../components/Spacer';
const Jet = () => {
  return (
    <Layout>
      <Spacer />
      <h2>{'Jet'}</h2>
      <Spacer height="0.5rem" />
      <div
        className={css`
          display: flex;
          justify-content: space-around;
          align-items: center;
          gap: 3rem;
        `}
      >
        <Link to={'/faye'}>{'faye'}</Link>
        <Link to={'/'}>{'cowboy-bebop'}</Link>
        <Link to={'/edward'}>{'edward'}</Link>
      </div>
      <Spacer />
      <Outlet />
    </Layout>
  );
};

export {Jet};
