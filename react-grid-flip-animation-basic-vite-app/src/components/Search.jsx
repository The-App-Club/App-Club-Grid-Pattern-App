import {useEffect, useRef, useMemo, useState} from 'react';
import {css, cx} from '@emotion/css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import {RiSearchLine} from 'react-icons/ri';
import {MdBusinessCenter} from 'react-icons/md';
import {IoFastFoodOutline} from 'react-icons/io5';
import {MdHolidayVillage} from 'react-icons/md';
import {MdPermMedia} from 'react-icons/md';
import {FaSpaceShuttle} from 'react-icons/fa';
import {TiWeatherSunny} from 'react-icons/ti';
import {Link, useNavigate} from 'react-router-dom';

const data = [
  {
    title: `business`,
    assetPath: `business`,
    icon: () => {
      return <MdBusinessCenter size={80} />;
    },
  },
  {
    title: `food`,
    assetPath: `food-and-drinks`,
    icon: () => {
      return <IoFastFoodOutline size={80} />;
    },
  },
  {
    title: `holiday`,
    assetPath: `holidays`,
    icon: () => {
      return <MdHolidayVillage size={80} />;
    },
  },
  {
    title: `media`,
    assetPath: `multimedia`,
    icon: () => {
      return <MdPermMedia size={80} />;
    },
  },
  {
    title: `space`,
    assetPath: `space`,
    icon: () => {
      return <FaSpaceShuttle size={80} />;
    },
  },
  {
    title: `weather`,
    assetPath: `weather`,
    icon: () => {
      return <TiWeatherSunny size={80} />;
    },
  },
];

const Search = () => {
  const navigate = useNavigate();

  // https://react-bootstrap.github.io/forms/overview/
  const searchDomRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Form
      className={css`
        --bs-body-font-family: "'Inter', sans-serif";
        max-width: 30rem;
        width: 100%;
        margin: 0 auto;
        padding: 0.5rem;
      `}
      onSubmit={(e) => {
        e.preventDefault();
        return false;
      }}
    >
      <Form.Group
        className={css`
          padding-bottom: 1rem;
          position: relative;
        `}
      >
        <Form.Label htmlFor="bebop-search">Bebop Search</Form.Label>
        <Form.Control
          id="bebop-search"
          placeholder="Keyword"
          ref={searchDomRef}
          onChange={(e) => {
            setSearchTerm(e.currentTarget.value);
          }}
        />
        <div
          className={css`
            position: absolute;
            right: 6px;
            top: 37px;
            :hover {
              cursor: pointer;
            }
          `}
          onClick={(e) => {
            setSearchTerm(e.currentTarget.value || '');
          }}
        >
          <RiSearchLine size={24} />
        </div>
      </Form.Group>
      <div
        className={css`
          display: grid;
          grid-template-columns: repeat(2, 1fr);
        `}
      >
        {data
          .filter((item) => {
            return item.title.indexOf(searchTerm) !== -1;
          })
          .map(({title, assetPath, icon}, index) => {
            return (
              <div
                key={index}
                className={css`
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  flex-direction: column;
                  gap: 0.5rem;
                  :hover {
                    cursor: pointer;
                    background: #f7f7f7;
                  }
                `}
                onClick={(e) => {
                  navigate('/tag', {
                    state: {
                      title,
                      assetPath,
                    },
                  });
                }}
              >
                {icon()}
                <p>{title}</p>
              </div>
            );
          })}
      </div>
    </Form>
  );
};

export {Search};
