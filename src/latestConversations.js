const fetch = require("node-fetch");

const API_BASE_URL = "https://example.com/api"; // the 'real' API URL is removed

class DataLoader {
  constructor({ maxConcurrentRequests = 10, requestIntervalMs = 100 } = {}) {
    this.maxConcurrentRequests = maxConcurrentRequests;
    this.requestIntervalMs = requestIntervalMs;
  }

  splitUrlsIntoChunks(urls, chunkSize) {
    return urls.reduce((resultArray, item, index) => {
      const chunkIndex = Math.floor(index / chunkSize);

      if (!resultArray[chunkIndex]) {
        // start a new chunk
        resultArray[chunkIndex] = [];
      }

      resultArray[chunkIndex].push(item);

      return resultArray;
    }, []);
  }

  wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async get(url) {
    const response = await fetch(url);
    const data = await response.json();

    return data;
  }

  async getMany(urls) {
    if (urls.length > this.maxConcurrentRequests) {
      const urlChunks = this.splitUrlsIntoChunks(
        urls,
        this.maxConcurrentRequests
      );
      let data = [];

      for (let chunk of urlChunks) {
        const chunkData = await Promise.all(chunk.map((url) => this.get(url)));

        data = [...data, ...chunkData];

        // wait before sending next chunk of requests
        await this.wait(this.requestIntervalMs);
      }

      return data;
    } else {
      const data = await Promise.all(urls.map((url) => this.get(url)));
      return data;
    }
  }
}

class Conversation {
  constructor() {}

  async getConversations() {
    const data = await dataLoader.get(`${API_BASE_URL}/conversations`);
    return data;
  }

  async getConversationMessages(ids) {
    const urls = ids.map(
      (id) => `${API_BASE_URL}/conversations/${id}/messages`
    );
    const data = await dataLoader.getMany(urls);
    return data;
  }
}

class User {
  constructor() {}

  async getUsers(ids) {
    const urls = ids.map((id) => `${API_BASE_URL}/users/${id}`);
    const data = await dataLoader.getMany(urls);
    return data;
  }
}

const dataLoader = new DataLoader();
const conversationAPI = new Conversation();
const userAPI = new User();

const mapConversationMessagesToMostRecentMessage = (conversationMessages) => {
  const sortByDate = (a, b) => new Date(b.created_at) - new Date(a.created_at);

  let mostRecentMessage = {};

  if (conversationMessages.length > 1) {
    const [latestMessage] = conversationMessages.sort(sortByDate);
    mostRecentMessage = latestMessage;
  } else {
    const [latestMessage] = conversationMessages;
    mostRecentMessage = latestMessage;
  }

  return mostRecentMessage;
};

const mapUserInformationToMessages = (message, users) => {
  const [{ id, avatar_url }] = users.filter(
    ({ id }) => id === message.from_user_id
  );

  return { ...message, from_user: { id, avatar_url } };
};

const formatMessages = ({
  id,
  body,
  conversation_id,
  created_at,
  from_user,
}) => ({
  id: conversation_id,
  latest_message: {
    id,
    body,
    created_at,
    from_user,
  },
});

const getRecentConversationSummaries = async () => {
  let recentConversationSummaries = [];

  try {
    // Get conversation ids
    const conversations = await conversationAPI.getConversations();
    const conversationIds = conversations.map(({ id }) => id);

    // Get conversation messages and select the latest message from the conversation
    const conversationMessages = await conversationAPI.getConversationMessages(
      conversationIds
    );
    const latestMessages = conversationMessages.map(
      mapConversationMessagesToMostRecentMessage
    );

    // Get user information
    const uniqueUserIds = [
      ...new Set(latestMessages.map(({ from_user_id }) => from_user_id)),
    ];
    const users = await userAPI.getUsers(uniqueUserIds);

    // Map messages with user information
    const latestMessagesWithUserInformation = latestMessages.map((message) =>
      mapUserInformationToMessages(message, users)
    );

    // Format the messages to correct format
    recentConversationSummaries = latestMessagesWithUserInformation.map(
      formatMessages
    );
  } catch (error) {
    console.error(error);
  }

  return recentConversationSummaries;
};

module.exports = {
  DataLoader,
  Conversation,
  User,
  dataLoader,
  conversationAPI,
  userAPI,
  mapConversationMessagesToMostRecentMessage,
  mapUserInformationToMessages,
  formatMessages,
  getRecentConversationSummaries,
};
