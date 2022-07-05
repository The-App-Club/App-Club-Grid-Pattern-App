import {css, cx} from '@emotion/css';
import styled from '@emotion/styled';
import {Layout} from '../../layouts/detail';
import {Link, useLocation} from 'react-router-dom';
import {useState} from 'react';
const StyledCharacterDetail = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-gap: 1rem;
  width: 100%;
  & > .div1 {
    grid-area: 1 / 1 / 3 / 2;
  }
  & > .div2 {
    grid-area: 1 / 2 / 2 / 3;
  }
  & > .div3 {
    grid-area: 2 / 2 / 3 / 3;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(3, auto);

    & .div1 {
      grid-area: 1 / 1 / 2 / 2;
    }
    & .div2 {
      grid-area: 2 / 1 / 3 / 2;
    }
    & .div3 {
      grid-area: 3 / 1 / 4 / 2;
    }
  }
`;

const CharacterDetail = () => {
  const {state} = useLocation();
  const [expanded, setExpanded] = useState(false);

  return (
    <Layout>
      <Link to={`/${state.character}`}>Back</Link>
      <h2>{'CharacterDetail'}</h2>
      <StyledCharacterDetail>
        <div
          className={cx('div1')}
          onClick={() => {
            setExpanded((expanded) => {
              return !expanded;
            });
          }}
        >
          <img
            className={css`
              display: block;
              max-width: 100%;
              width: 100%;
            `}
            src={state.src}
            alt={''}
          />
        </div>
        <div className={'div2'}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            mollitia, molestiae quas vel sint commodi repudiandae consequuntur
            voluptatum laborum numquam blanditiis harum quisquam eius sed odit
            fugiat iusto fuga praesentium optio, eaque rerum! Provident
            similique accusantium nemo autem.
          </p>
        </div>
        <div className={'div3'}>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
      </StyledCharacterDetail>
    </Layout>
  );
};

export {CharacterDetail};
