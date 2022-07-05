import {useState, useRef, useMemo, createRef} from 'react';
import {after} from 'underscore';
import {css} from '@emotion/css';
const Images = ({urls, notifier}) => {
  const count = useRef(0);
  const loadedImageDomListRef = useMemo(() => {
    return urls.map((url, index) => {
      return createRef();
    });
  }, [urls]);
  const [loading, setLoading] = useState(true);
  const onComplete = after(urls.length, (e) => {
    setLoading(false);
    notifier({
      status: `complete`,
      domInfoList: loadedImageDomListRef.map((loadedImageDomRef, index) => {
        const dom = loadedImageDomRef.current;
        return {dom, width: dom.width, height: dom.height, url: urls[index]};
      }),
    });
    // window.alert('loaded');
    // console.log('loaded');
  });
  const onProgress = (e) => {
    count.current = count.current + 1;
    notifier({
      status: `progress`,
      count: count.current,
      total: urls.length,
      progress: count.current / urls.length,
    });
  };
  return (
    <>
      {loading && <span>Loading ...</span>}
      {urls.map((url, index) => {
        return (
          <img
            className={css`
              display: none;
            `}
            ref={loadedImageDomListRef[index]}
            src={url}
            onLoad={(e) => {
              onComplete(e);
              onProgress(e);
            }}
            onError={onComplete}
            key={index}
          />
        );
      })}
    </>
  );
};

export {Images};
