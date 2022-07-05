import {createRoot} from 'react-dom/client';
import {css} from '@emotion/css';
import {useSprings, animated} from 'react-spring';
import styled from '@emotion/styled';

const StyledContainer = styled.div`
  & {
    max-width: 100vw;
    width: 100vw;
    height: 450px;
    white-space: nowrap;
    overflow-x: scroll;

    &::-webkit-scrollbar {
      display: none;
    }

    .cardWrapper {
      margin: 50px 20px;
    }
  }

  .cardWrapper {
    display: inline-block;
    border-radius: 10px;
    .profileCard {
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 10px;
      height: 300px;
      width: 200px;
      padding: 20px;
      background: #cdd6e6;
      position: relative;

      .iconHolder {
        position: absolute;
        right: 25px;
        display: flex;
        flex-direction: row;
        a {
          color: #48505a;
          font-size: 20px;
          text-decoration: none;
          margin-right: 5px;
          &:last-child {
            margin: auto;
          }
        }
      }

      .test {
        position: absolute;
        right: 10px;
      }
      img {
        height: auto;
        width: 100px;
        border-radius: 50%;
      }

      .divider {
        margin: 20px 0px 0px 0px;
        width: 60%;
        height: 2px;
        border-radius: 20px;
        background: rgba(0, 0, 0, 0.2);
      }

      .details {
        text-align: left;
        font-weight: 500;
        .name {
          text-align: center;
        }
      }
    }
  }
`;

const Profiles = () => {
  const profiles = [
    {
      name: 'Sabin Adams',
      description: 'UI/UX Enthusiast',
      img: 'https://media.giphy.com/media/vRKJTZ1w731kc/giphy.gif',
      emoji: '💻',
      twitter: true,
      facebook: false,
    },
    {
      name: 'Maddy Adams',
      description: 'Creative Arts Team',
      img: 'https://media.giphy.com/media/KchOMpZh6dYek/giphy.gif',
      emoji: '🎨',
      twitter: true,
      facebook: true,
    },
    {
      name: 'Eli Adams',
      description: 'Food Sales',
      img: 'https://media.giphy.com/media/ovrcwymJaF9f2/giphy.gif',
      emoji: '🍔',
      twitter: false,
      facebook: false,
    },
    {
      name: 'Abram Adams',
      description: 'Full-Stack Developer',
      img: 'https://media.giphy.com/media/zy89dUFZCagFy/giphy.gif',
      emoji: '🖥️',
      twitter: true,
      facebook: true,
    },
    {
      name: 'Erin Adams',
      description: 'Photographer',
      img: 'https://media.giphy.com/media/vcvbVZOBhWZqw/giphy.gif',
      emoji: '📷',
      twitter: false,
      facebook: true,
    },
    {
      name: 'Andrew Adams',
      description: 'Mobile App Developer',
      img: 'https://media.giphy.com/media/Gi8ilHwjq6kcU/giphy.gif',
      emoji: '📱',
      facebook: true,
      twitter: false,
    },
  ];
  const [scaleSprings, set] = useSprings(profiles.length, (index) => {
    return {
      transform: `scale(1)`,
      boxShadow: `0px 5px 15px 0px rgba(0, 0, 0, 0.30)`,
      from: {
        transform: `scale(0.5)`,
        boxShadow: `0px 0px 0px 0px rgba(0, 0, 0, 0.30)`,
      },
      // config: {tension: 400, mass: 2, velocity: 5},
    };
  });

  const updateHover = (hovering) => ({
    transform: `scale(${hovering ? 1.5 : 1})`,
    boxShadow: `0px ${
      hovering ? '10px 20px' : '5px 15px'
    } 0px rgba(0, 0, 0, 0.30)`,
  });

  return (
    <StyledContainer>
      {scaleSprings.map((props, i) => (
        <animated.div
          className="cardWrapper"
          key={i}
          style={props}
          onMouseEnter={() => set((item) => item === i && updateHover(true))}
          onMouseLeave={() => set((item) => item === i && updateHover(false))}
        >
          <div className="profileCard">
            <div className="iconHolder">
              {profiles[i].twitter && <a className="fa fa-twitter"></a>}
              {profiles[i].facebook && <a className="fa fa-facebook"></a>}
            </div>
            <img src={profiles[i].img} />
            <div className="divider"></div>
            <div className="details">
              <h3 className="name">{profiles[i].name}</h3>
              <p className="description">{profiles[i].description}</p>
            </div>
          </div>
        </animated.div>
      ))}
    </StyledContainer>
  );
};

export {Profiles};
