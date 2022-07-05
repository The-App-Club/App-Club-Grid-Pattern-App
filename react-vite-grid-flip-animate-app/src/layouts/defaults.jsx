import {css} from '@emotion/css';
import {motion} from 'framer-motion';

const layoutAnimation = {
  initial: {
    x: 0,
    y: 60,
    opacity: 0,
  },
  enter: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
    },
  },
  leave: {
    x: 0,
    y: 60,
    opacity: 0,
  },
};

const Layout = ({children}) => {
  return (
    <motion.div
      initial={'initial'}
      animate={'enter'}
      exit={'leave'}
      variants={layoutAnimation}
      className={css`
        display: flex;
        justify-content: start;
        flex-direction: column;
        align-items: center;
        margin: 0 auto;
        max-width: 40rem;
        padding: 0 20px;
        @media screen and (max-width: 768px) {
          max-width: 100vw;
          padding: 0 10px;
        }
      `}
    >
      {children}
    </motion.div>
  );
};

export {Layout};
