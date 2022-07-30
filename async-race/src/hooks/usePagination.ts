import { useEffect, useState } from 'react';

export const usePagination = <T>(
  data: T[],
  limit: number,
  uniqueKey: string,
): [
    number,
    number,
    T[],
    () => void,
    () => void,
  ] => {
  const [page, setPage] = useState<number>(localStorage.getItem(uniqueKey + 'Page')
    ? parseInt(localStorage.getItem(uniqueKey + 'Page') as string, 10) : 1);
  const [pages, setPages] = useState<number>(localStorage.getItem(uniqueKey + 'Pages') ?
    parseInt(localStorage.getItem(uniqueKey + 'Pages') as string, 10) : 1);
  const [dataPaginated, setDataPaginated] = useState<T[]>([]);

  useEffect(() => {
    setPages(Math.ceil(data.length / limit));
  }, [data, limit]);

  useEffect(() => {
    const start = (page - 1) * limit;
    const end = page * limit;
    localStorage.setItem(uniqueKey + 'Page', page.toString());
    localStorage.setItem(uniqueKey + 'Pages', pages.toString());
    setDataPaginated(data.slice(start, end));
  }, [data, page, pages, limit]);

  const nextPage = (): void => {
    if (page < pages) {
      setPage(page + 1);
    }
  };

  const prevPage = (): void => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return [
    page,
    pages,
    dataPaginated,
    nextPage,
    prevPage,
  ];
};
