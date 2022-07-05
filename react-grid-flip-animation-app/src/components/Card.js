import styled from '@emotion/styled';
import {useState} from 'react';
import data from '../data/dump.json';
import gsap from 'gsap';
import {css, cx} from '@emotion/css';
import {useMedia} from '../hooks/useMedia';
import {LoremIpsum} from 'lorem-ipsum';
const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});
const StyledCard = styled.div`
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

const expandedCardStyle = css`
  align-items: flex-start !important;
`;

const cardTitleStyle = css`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const expandedCardTitleStyle = css``;

const cardDescriptionStyle = css`
  font-size: 2rem;
`;

const expandedCardDescriptionStyle = css``;

const Card = ({n}) => {
  const [expanded, setExpanded] = useState(false);

  const columns = useMedia({
    queries: [
      '(min-width: 1500px)',
      '(min-width: 1000px)',
      '(min-width: 600px)',
      '(min-width: 300px)',
    ],
    values: [5, 4, 3, 2],
    defaultValue: 1,
  });

  const avaterStyle = css`
    height: 6rem;
    width: 6rem;
    border-radius: 50%;
    margin-bottom: 1rem;
    background-image: url(${gsap.utils.wrap(data, n)});
    background-size: cover;
    background-position: center center;
    clip-path: circle(50% at 50% 50%);
    transition: width 0.6s, height 0.6s;
  `;

  const expandedAvaterStyle = css`
    height: 8rem;
    width: 8rem;
  `;

  let expandedStyle = css`
    grid-column: span 2;
    grid-row: span 2;
  `;

  if (columns === 1) {
    expandedStyle = css`
      grid-column: span 1;
      grid-row: span 2;
    `;
  }

  return (
    <StyledCard
      className={cx(
        css`
          ${expanded ? expandedStyle : css``}
        `,
        css`
          ${expanded ? expandedCardStyle : css``}
        `
      )}
      onClick={() => {
        setExpanded((expanded) => {
          return !expanded;
        });
      }}
    >
      <div>
        <div
          className={cx(
            avaterStyle,
            css`
              ${expanded ? expandedAvaterStyle : css``}
            `
          )}
        ></div>
        <div
          className={cx(
            cardTitleStyle,
            css`
              ${expanded ? expandedCardTitleStyle : css``}
            `
          )}
        >{`Sample Title`}</div>
        <div
          className={cx(
            cardDescriptionStyle,
            css`
              ${expanded ? expandedCardDescriptionStyle : css``}
            `
          )}
        >{`Sample Description`}</div>
        {expanded && (
          <div
            className={css`
              font-size: 2.5rem;
            `}
          >
            {lorem.generateSentences(3)}
          </div>
        )}
      </div>
    </StyledCard>
  );
};

export {Card};
