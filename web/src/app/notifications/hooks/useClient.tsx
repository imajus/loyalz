import { useContext } from 'react';
import { ClientContext } from '../context/ClientContext';

export function useClient() {
  return useContext(ClientContext).client;
}
