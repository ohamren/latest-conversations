const chai = require("chai");
const sinon = require("sinon");
chai.should();
const expect = chai.expect;

const {
  mockConversations,
  mockConversationMessages3,
  mockConversationWithMessages,
  mockUsers,
  expectedRecentConversationSummaries,
} = require("./mockdata");

const {
  DataLoader,
  conversationAPI,
  userAPI,
  mapConversationMessagesToMostRecentMessage,
  mapUserInformationToMessages,
  getRecentConversationSummaries,
} = require("../latestConversations");

describe("dataLoader", () => {
  let dataLoader = {};

  beforeEach(() => {
    dataLoader = new DataLoader();
  });

  describe("splitUrlsIntoChunks", () => {
    it("split array into chunks based on chunk size", () => {
      const arr = [1, 2, 3, 4, 5];
      const chunkSize = 2;

      const chunks = dataLoader.splitUrlsIntoChunks(arr, chunkSize);
      expect(chunks.length).to.equal(3);
    });

    it("return one chunk if the chunk size is greater than the items in the array", () => {
      const arr = [1, 2, 3, 4, 5];
      const chunkSize = 10;

      const chunks = dataLoader.splitUrlsIntoChunks(arr, chunkSize);
      expect(chunks.length).to.equal(1);
    });
  });
});

describe("mapConversationMessagesToMostRecentMessage", () => {
  it("returns the most recent message when several messages exists", () => {
    // message1 out of two being the most recent
    const [message1] = mockConversationMessages3;

    expect(
      mapConversationMessagesToMostRecentMessage(mockConversationMessages3)
    ).to.deep.equal(message1);
  });
});

describe("mapUserInformationToMessages", () => {
  it("adds user id and avatar url to message", () => {
    const [message1] = mockConversationMessages3;

    const messageWithUserInformation = {
      ...message1,
      from_user: {
        avatar_url: "http://placekitten.com/g/300/300",
        id: "1",
      },
    };

    expect(mapUserInformationToMessages(message1, mockUsers)).to.deep.equal(
      messageWithUserInformation
    );
  });
});

describe("getRecentConversationSummaries", () => {
  before(() => {
    sinon.replace(conversationAPI, "getConversations", () => mockConversations);
    sinon.replace(
      conversationAPI,
      "getConversationMessages",
      () => mockConversationWithMessages
    );
    sinon.replace(userAPI, "getUsers", () => mockUsers);
  });

  after(() => {
    sinon.restore();
  });

  it("returns recent conversations with summaries", async () => {
    const conversations = await getRecentConversationSummaries();

    expect(conversations).to.deep.equal(expectedRecentConversationSummaries);
  });
});
