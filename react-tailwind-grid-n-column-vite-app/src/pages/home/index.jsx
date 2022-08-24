import {css, cx} from '@emotion/css';
import {motion} from 'framer-motion';
import {useState} from 'react';
import {useMemo} from 'react';
import {Layout} from '../../layouts/default';
import {Flipper, Flipped} from 'react-flip-toolkit';

const HomePage = ({gutter = `1rem`}) => {
  const [columnCount, setColumnCount] = useState(5);

  const data = useMemo(() => {
    return [...Array(10)].map((_, index) => {
      return {value: index};
    });
  }, []);

  const handleNcolumns = (e, {columnCount}) => {
    setColumnCount(columnCount);
  };

  return (
    <Layout>
      <section
        className={cx(
          `max-w-7xl mx-auto w-full relative pt-12 scrollbar-none overflow-hidden overflow-y-auto`,
          css`
            min-height: 100vh;
          `
        )}
      >
        <h2 className="text-3xl flex items-center justify-center">HomePage</h2>
        <div
          className={cx(
            css`
              @media (max-width: 1100px) {
                max-width: 20rem;
                display: grid;
                grid-template-columns: repeat(2, 1fr);
              }
            `,
            `m-auto flex items-center gap-2 w-full p-4`
          )}
        >
          <button
            type={'button'}
            className={cx(
              css``,
              `bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-2`
            )}
            onClick={(e) => {
              handleNcolumns(e, {columnCount: 1});
            }}
          >
            1 Columns
          </button>
          <button
            type={'button'}
            className={cx(
              css``,
              `bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-2`
            )}
            onClick={(e) => {
              handleNcolumns(e, {columnCount: 2});
            }}
          >
            2 Columns
          </button>
          <button
            type={'button'}
            className={cx(
              css``,
              `bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-2`
            )}
            onClick={(e) => {
              handleNcolumns(e, {columnCount: 3});
            }}
          >
            3 Columns
          </button>
          <button
            type={'button'}
            className={cx(
              css``,
              `bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-2`
            )}
            onClick={(e) => {
              handleNcolumns(e, {columnCount: 4});
            }}
          >
            4 Columns
          </button>
          <button
            type={'button'}
            className={cx(
              css``,
              `bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-2`
            )}
            onClick={(e) => {
              handleNcolumns(e, {columnCount: 5});
            }}
          >
            5 Columns
          </button>
        </div>
        <Flipper flipKey={columnCount}>
          <motion.div
            className={cx(
              css`
                width: 100%;
                column-count: ${columnCount};
                column-gap: ${gutter};
                padding: ${gutter};
                @media (max-width: 1100px) {
                  column-count: 4;
                  column-gap: ${gutter};
                }
                @media (max-width: 850px) {
                  column-count: 3;
                  column-gap: ${gutter};
                }
                @media (max-width: 650px) {
                  column-count: 2;
                  column-gap: ${gutter};
                }
              `
            )}
          >
            {data.map((item, index) => {
              return (
                <Flipped key={index} flipId={`item-${item.value}`}>
                  <motion.div
                    className={cx(
                      css`
                        /* https://developer.mozilla.org/ja/docs/Web/CSS/break-inside */
                        break-inside: avoid;
                        min-height: 12rem;
                        margin-bottom: ${gutter};
                      `,
                      `border-2`
                    )}
                  >
                    <Flipped inverseFlipId={`item-${item.value}`} scale>
                      <div className="flex-col flex items-center justify-center">
                        <h2 className="text-xl">something title</h2>
                        <p>
                          description<span className="font-bold">{index}</span>
                        </p>
                      </div>
                    </Flipped>
                  </motion.div>
                </Flipped>
              );
            })}
          </motion.div>
        </Flipper>
      </section>
    </Layout>
  );
};

export {HomePage};
