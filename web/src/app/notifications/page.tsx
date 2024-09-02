'use client';
import ClientProvider from './context/ClientContext';
import NewsListView from './views/NewsListView';

export default function page() {
  return (
    <div>
      <ClientProvider>
        <NewsListView />
      </ClientProvider>
    </div>
  );
}
