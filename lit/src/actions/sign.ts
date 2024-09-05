// @ts-nocheck

const litActionCode = async () => {
  try {
    const sigShare = await LitActions.signEcdsa({
      toSign: dataToSign,
      publicKey,
      sigName: "sig",
    });
    LitActions.setResponse({ response: JSON.stringify(sigShare) });
  } catch (error) {
    LitActions.setResponse({ response: error.message });
  }
};

export default `(${litActionCode.toString()})();`;