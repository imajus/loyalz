import type { StoreState } from '@/shared/store';
import { Web3User } from '@/shared/types';

export const userSelector = (state: StoreState): Web3User => state.user;
