import React, { useMemo } from 'react';

export type Pagination = {
  page: number;
  perPage: number;
  count: number;
  pageChange: (value: number) => void;
};

export const itemWithIndex = (page: number, perPage: number, len: number) => {
  const startIndex = page * perPage - (perPage - 1);
  const endIndex = page * perPage >= len ? len : page * perPage;
  return { startIndex, endIndex };
};

export const itemWithPage = (page: number, perPage: number, data: any[]) => {
  const { startIndex, endIndex } = itemWithIndex(page, perPage, data.length);
  return data.slice(startIndex - 1, endIndex);
};

const Pagination = ({ page, perPage, count, pageChange }: Pagination) => {
  const allPageNumber = useMemo(() => {
    if (count < perPage) return 1;
    return Math.floor(count / perPage) + (count % perPage > 0 ? 1 : 0);
  }, [perPage, count]);

  const { startIndex, endIndex } = itemWithIndex(page, perPage, count);

  if (allPageNumber === 1) return null;

  return (
    <div className="pagination">
      <div className="wrapper">
        <div className="count-item">
          <p>
            {startIndex}-{endIndex} of {count}
          </p>
        </div>
        <div className="page-item-wrapper">
          {allPageNumber <= 6
            ? Array(allPageNumber)
                .fill('')
                .map((_, i) => {
                  return (
                    <button
                      className={`page-item ${page === i + 1 ? 'active' : ''}`}
                      onClick={() => pageChange(i + 1)}
                      key={i}
                    >
                      {i + 1}
                    </button>
                  );
                })
            : null}
          {allPageNumber > 6 ? (
            <React.Fragment>
              <button className={`page-item ${page === 1 ? 'active' : ''}`} onClick={() => pageChange(1)}>
                1
              </button>
              <span className="three-dot" hidden={page <= 4}>
                ...
              </span>
              {Array(4)
                .fill('')
                .map((_, i) => {
                  const fromPage = page >= allPageNumber - 3 ? allPageNumber - 3 : page;
                  const iPage = i + fromPage - 1;
                  if (iPage <= 1) return;
                  if (iPage >= allPageNumber) return;
                  return (
                    <button
                      key={iPage}
                      className={`page-item ${iPage === page ? 'active' : ''}`}
                      onClick={() => pageChange(iPage)}
                    >
                      {iPage}
                    </button>
                  );
                })}
              <span className="three-dot" hidden={page >= allPageNumber - 3}>
                ...
              </span>
              <button
                onClick={() => pageChange(allPageNumber)}
                className={`page-item ${page === allPageNumber ? 'active' : ''}`}
              >
                {allPageNumber}
              </button>
            </React.Fragment>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Pagination;
