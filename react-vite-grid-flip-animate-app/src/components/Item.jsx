import styled from '@emotion/styled';
import {useState} from 'react';
import {css, cx} from '@emotion/css';
import {useNavigate} from 'react-router-dom';
import {Spacer} from '../components/Spacer';

const expandedStyle = css`
  width: 100%;
  grid-column: span 2 !important;
  grid-row: span 2 !important;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  background: wheat;
  min-height: 70vh;
`;

const StyledItem = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border-width: 8px;
  border-style: solid;
  border-image: linear-gradient(
    9deg,
    #ffde65,
    #ff8484 50%,
    #ff86c3 60%,
    #716fff 80%
  );
  border-image-slice: 1;
  transition: align-items 0.6s;
  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const Item = ({src, alt, n, character}) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  return (
    <StyledItem
      className={cx(
        css`
          ${expanded ? expandedStyle : css``}
        `,
        `div${n}`
      )}
      onClick={() => {
        setExpanded((expanded) => {
          return !expanded;
        });
        // navigate(`/${character}/detail${n}`, {
        //   replace: true,
        //   state: {
        //     character,
        //     src,
        //     alt,
        //   },
        // });
      }}
    >
      <div
        className={css`
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        `}
      >
        <img
          className={css`
            display: block;
            max-width: 100%;
            width: 100%;
          `}
          src={src}
          alt={alt}
        />
        <Spacer />
        {expanded && (
          <p
            className={css`
              font-size: 1.2rem;
            `}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            mollitia, molestiae quas vel sint commodi repudiandae consequuntur
            voluptatum laborum numquam blanditiis harum quisquam eius sed odit
            fugiat iusto fuga praesentium optio, eaque rerum! Provident
            similique accusantium nemo autem.
          </p>
        )}
      </div>
    </StyledItem>
  );
};

export {Item};
