'use client';

import { news } from '@/mock/news';
import { MainWrapper } from '@/shared/components';

import { NewsItem } from './ui/NewsItem';

export const News = () => {
  return (
    <MainWrapper title="News" page="news">
      <div
        className="grid m-5 gap-14 overflow-y-scroll overflow-x-hidden h-full pt-7 "
        style={{ scrollbarWidth: 'none', width: 'calc(100% - 40px)' }}
      >
        {news.map((item) => (
          <NewsItem key={item.id} item={item} />
        ))}
      </div>
    </MainWrapper>
  );
};
