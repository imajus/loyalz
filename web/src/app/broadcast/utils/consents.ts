import { Client } from '@xmtp/xmtp-js';

export const allowedConsentList = async (client: Client) => {
  // Fetch the consent list from the client
  const consentList = await client.contacts.refreshConsentList();

  // Create a unique consent list by removing duplicates
  let uniqueConsentList = consentList
    .slice() // Create a copy of the consent list
    .reverse() // Reverse the list to keep the latest consent
    .filter(
      // Filter out duplicates by checking if the current index is the first occurrence of the consent value
      (consent, index, self) => index === self.findIndex((t) => t.value === consent.value),
    )
    .reverse(); // Reverse the list back to the original order

  // Sort the unique consent list based on the permission type
  uniqueConsentList = uniqueConsentList.sort((a, b) => {
    // If 'a' is allowed and 'b' is not, 'a' should come first
    if (a.permissionType === 'allowed' && b.permissionType !== 'allowed') return -1;
    // If 'a' is unknown and 'b' is not, 'b' should come first
    if (a.permissionType === 'unknown' && b.permissionType !== 'unknown') return 1;
    // If 'a' is denied and 'b' is not, 'b' should come first
    if (a.permissionType === 'denied' && b.permissionType !== 'denied') return 1;
    // If none of the above conditions are met, keep the original order
    return 0;
  });

  // Return the unique and sorted and allowed consent list
  return uniqueConsentList.filter(({ permissionType }) => permissionType === 'allowed');
};
