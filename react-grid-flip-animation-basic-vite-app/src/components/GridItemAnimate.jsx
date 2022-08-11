import {motion, useAnimationControls} from 'framer-motion';
import {css, cx} from '@emotion/css';
import {useEffect} from 'react';
import {Button} from 'react-bootstrap';

const GridItemAnimate = ({item, expanded, className = css``}) => {
  const controls = useAnimationControls();
  const buttonControls = useAnimationControls();

  useEffect(() => {
    if (expanded) {
      controls.start({
        display: 'block',
        y: 0,
        opacity: 1,
      });
    } else {
      controls.start({
        display: 'none',
        y: 60,
        opacity: 0,
      });
    }
  }, [expanded]);

  return (
    <div
      className={css`
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-direction: column;
        padding: 0.5rem;
      `}
    >
      <Button
        className={css`
          position: absolute;
          bottom: 0;
          right: 0;
        `}
        variant="primary"
        onClick={(e) => {
          e.stopPropagation();
          console.log('do navigate detail', item);
        }}
      >
        More
      </Button>
      <img
        src={item.url}
        loading="lazy"
        type="image/png"
        alt={item.title}
        className={cx(css``, className)}
      />
      <b>{`$${item.price}`}</b>
      <motion.p
        initial={{
          display: 'none',
        }}
        transition={{
          duraion: 0.4,
          ease: 'easeOut',
        }}
        animate={controls}
      >
        {item.description}
      </motion.p>
    </div>
  );
};

export {GridItemAnimate};
