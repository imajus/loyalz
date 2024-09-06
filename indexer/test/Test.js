
const assert = require("assert");
const { TestHelpers } = require("generated");
const { MockDb, MultiTokenERC20 } = TestHelpers;

describe("MultiTokenERC20 contract OwnershipTransferred event tests", () => {
  // Create mock db
  const mockDb = MockDb.createMockDb();

  // Creating mock for MultiTokenERC20 contract OwnershipTransferred event
  const event = MultiTokenERC20.OwnershipTransferred.createMockEvent({/* It mocks event fields with default values. You can overwrite them if you need */});

  it("MultiTokenERC20_OwnershipTransferred is created correctly", async () => {
    // Processing the event
    const mockDbUpdated = await MultiTokenERC20.OwnershipTransferred.processEvent({
      event,
      mockDb,
    });

    // Getting the actual entity from the mock database
    let actualMultiTokenERC20OwnershipTransferred = mockDbUpdated.entities.MultiTokenERC20_OwnershipTransferred.get(
      `${event.chainId}_${event.block.number}_${event.logIndex}`
    );

    // Creating the expected entity
    const expectedMultiTokenERC20OwnershipTransferred = {
      id:`${event.chainId}_${event.block.number}_${event.logIndex}`,
      previousOwner: event.params.previousOwner,
      newOwner: event.params.newOwner,
    };
    // Asserting that the entity in the mock database is the same as the expected entity
    assert.deepEqual(
      actualMultiTokenERC20OwnershipTransferred,
      expectedMultiTokenERC20OwnershipTransferred,
      "Actual MultiTokenERC20OwnershipTransferred should be the same as the expectedMultiTokenERC20OwnershipTransferred"
    );
  });
});
