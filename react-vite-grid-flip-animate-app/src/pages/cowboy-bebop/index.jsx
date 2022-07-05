import {css} from '@emotion/css';
import {Link} from 'react-router-dom';
import {Layout} from '../../layouts/defaults';
import {Spacer} from '../../components/Spacer';
const CowboyBebop = () => {
  return (
    <Layout>
      <Spacer />
      <h2>{'CowboyBebop'}</h2>
      <Spacer height="1.5rem" />
      <div
        className={css`
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          gap: 3rem;
        `}
      >
        <Link to={'/spike'}>Spike</Link>
        <Link to={'/faye'}>Faye</Link>
        <Link to={'/jet'}>Jet</Link>
        <Link to={'/edward'}>Edward</Link>
      </div>
    </Layout>
  );
};

export {CowboyBebop};
