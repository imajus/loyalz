import type { StoreState } from '@/shared/store';
import { Contract } from '@/shared/types';

export const contractSelector = (state: StoreState): Contract => state.contract;
