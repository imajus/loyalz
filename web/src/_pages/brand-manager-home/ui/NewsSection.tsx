'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

import { news } from '@/mock/news';
import { Spinner } from '@/shared/components';

const SendNewsForm = dynamic(() => import('./send-news-form/SendNewsForm'), { ssr: false });

type PropTypes = {
  isLoading: boolean;
};

export const NewsSection = ({ isLoading }: PropTypes) => {
  const [latestNews, setLatestNews] = useState<string>();

  useEffect(() => {
    const latestNews = news.slice(-1)[0];
    setLatestNews(latestNews.text);
  }, []);

  return (
    <div className="font-['Inter'] w-full flex flex-col items-start gap-2">
      <span className="font-bold text-[30px]">News</span>
      <div className="flex flex-col gap-3 items-start justify-center w-full">
        <span className="text-[14px]">Latest news</span>
        {isLoading ? (
          <div className="p-3 border border-slate-300 w-full rounded-lg h-36 bg-slate-300">
            <Spinner />
          </div>
        ) : (
          <span
            className="p-3 border border-slate-300 w-full rounded-lg min-h-20 max-h-36 overflow-y-scroll"
            style={{ scrollbarWidth: 'none' }}
          >
            {latestNews}
          </span>
        )}
      </div>
      <SendNewsForm />
    </div>
  );
};
