import {useState, useLayoutEffect} from 'react';
import {css} from '@emotion/css';
import styled from '@emotion/styled';
import {useTrail, animated} from 'react-spring';

const StyledTrailText = styled(animated.div)`
  position: relative;
  min-width: 1rem;
  font-size: 4rem;
  color: #000;
  will-change: top, opacity;
  & > div {
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }
`;

const StaggerText = ({title = `Cowboy Bebop`}) => {
  const [toggle, setToggle] = useState(true);
  const trail = useTrail(title.length, {
    opacity: toggle ? 1 : 0,
    // y: toggle ? 0 : -120,
    // from: {opacity: 0, y: -120},
    y: toggle ? 0 : 120,
    from: {opacity: 0, y: 120},
    config: {mass: 5, tension: 2000, friction: 200},
  });

  useLayoutEffect(() => {
    const handleClick = (e) => {
      setToggle((state) => {
        return !state;
      });
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div
      className={css`
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      <div
        className={css`
          display: flex;
        `}
      >
        {trail.map(({y, height, opacity}, index) => {
          const chars = [...title];
          return (
            <StyledTrailText
              key={index}
              style={{
                opacity,
                top: y,
              }}
            >
              <animated.div>{chars[index]}</animated.div>
            </StyledTrailText>
          );
        })}
      </div>
    </div>
  );
};

export {StaggerText};
