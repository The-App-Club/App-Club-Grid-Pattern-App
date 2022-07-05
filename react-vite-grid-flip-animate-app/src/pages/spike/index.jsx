import {Layout} from '../../layouts/defaults';
import {css} from '@emotion/css';
import {Link, Outlet} from 'react-router-dom';
import {Spacer} from '../../components/Spacer';
const Spike = () => {
  return (
    <Layout>
      <Spacer />
      <h2>{'Spike'}</h2>
      <Spacer height="0.5rem" />
      <div
        className={css`
          display: flex;
          justify-content: space-around;
          align-items: center;
          gap: 3rem;
        `}
      >
        <Link to={'/edward'}>{'edward'}</Link>
        <Link to={'/'}>{'cowboy-bebop'}</Link>
        <Link to={'/faye'}>{'faye'}</Link>
      </div>
      <Spacer />
      <Outlet />
    </Layout>
  );
};

export {Spike};
