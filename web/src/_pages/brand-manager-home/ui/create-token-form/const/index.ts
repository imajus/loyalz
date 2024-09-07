import { Blockchain } from '@/shared/types';

import { CreateTokenErrors } from '../types';

export const emptyErrors: CreateTokenErrors = {
  token: '',
  blockchain: '',
};

export const blockchains: { [key in Blockchain]: string } = {
  MorphHoleskyTestnet: 'Morph Holesky Testnet ⇒ 2810',
  ChilizSpicyTestnet: 'Chiliz Spicy Testnet ⇒ 88882',
  RootstockTestnet: 'Rootstock Testnet ⇒ 31',
  HederaTestnet: 'Hedera Testnet ⇒ 296',
};
