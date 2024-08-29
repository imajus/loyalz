'use client';
import React from 'react';
import NewsListView from './views/NewsListView';
import ClientProvider from './context/ClientContext';

export default function page () {
  return (
    <div>
      <ClientProvider>
        <NewsListView />
      </ClientProvider>
    </div>
  )
}
