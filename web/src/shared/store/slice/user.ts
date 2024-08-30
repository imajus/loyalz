import { Web3User } from '@/shared/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: Web3User = {
  appState: '',
  email: '',
  aggregateVerifier: '',
  name: '',
  profileImage: '',
  typeOfLogin: '',
  verifier: '',
  verifierId: '',
  dappShare: '',
  oAuthIdToken: '',
  oAuthAccessToken: '',
  isMfaEnabled: false,
  idToken: '',
};

const slice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    login: (state: Web3User, action: PayloadAction<{ data: Web3User }>) => {
      const payload = action.payload.data;

      state.appState = payload.appState;
      state.email = payload.email;
      state.aggregateVerifier = payload.aggregateVerifier;
      state.name = payload.name;
      state.profileImage = payload.profileImage;
      state.typeOfLogin = payload.typeOfLogin;
      state.verifier = payload.verifier;
      state.verifierId = payload.verifierId;
      state.dappShare = payload.dappShare;
      state.oAuthIdToken = payload.oAuthIdToken;
      state.oAuthAccessToken = payload.oAuthAccessToken;
      state.isMfaEnabled = payload.isMfaEnabled;
      state.idToken = payload.idToken;
    },

    logout: (state) => {
      state.appState = initialState.appState;
      state.email = initialState.email;
      state.aggregateVerifier = initialState.aggregateVerifier;
      state.name = initialState.name;
      state.profileImage = initialState.profileImage;
      state.typeOfLogin = initialState.typeOfLogin;
      state.verifier = initialState.verifier;
      state.verifierId = initialState.verifierId;
      state.dappShare = initialState.dappShare;
      state.oAuthIdToken = initialState.oAuthIdToken;
      state.oAuthAccessToken = initialState.oAuthAccessToken;
      state.isMfaEnabled = initialState.isMfaEnabled;
      state.idToken = initialState.idToken;
    },
  },
});

export const { login, logout } = slice.actions;

export default slice.reducer;
