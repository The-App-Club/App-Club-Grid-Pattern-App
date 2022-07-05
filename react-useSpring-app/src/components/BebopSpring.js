import {useSpring, animated} from 'react-spring';
const BebopSpring = () => {
  const styles = useSpring({
    loop: true,
    opacity: 1,
    delay: 700,
    transform: 'translateX(0px)',
    from: {
      opacity: 0,
      transform: 'translateX(-250px)',
    },
  });
  return <animated.div style={styles}>Cowboy Bebop</animated.div>;
};
export {BebopSpring};
