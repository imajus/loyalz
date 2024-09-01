'use client';

import { news } from '@/mock/news';
import { Button, MainWrapper } from '@/shared/components';
import { toastInfo } from '@/shared/utils/toast';

import { NewsItem } from './ui/NewsItem';

export const News = () => {
  return (
    <MainWrapper title="Earn" page="earn">
      <div
        className="grid m-5 gap-14 overflow-y-scroll overflow-x-hidden h-full pt-7 "
        style={{ scrollbarWidth: 'none', width: 'calc(100% - 40px)' }}
      >
        {news.map((item) => (
          <NewsItem key={item.id} item={item} />
        ))}
      </div>
      <div className="flex items-center justify-center h-20 w-full">
        <Button onClick={() => toastInfo('scan re')} title="Scan receipt QR" />
      </div>
    </MainWrapper>
  );
};
