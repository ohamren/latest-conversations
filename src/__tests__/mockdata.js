const mockConversations = [
  { id: "1", with_user_id: "2", unread_message_count: 1 },
  { id: "2", with_user_id: "3", unread_message_count: 0 },
  { id: "3", with_user_id: "4", unread_message_count: 0 },
  { id: "4", with_user_id: "5", unread_message_count: 0 },
  { id: "5", with_user_id: "6", unread_message_count: 0 },
];

const mockConversationMessages1 = [
  {
    id: "1",
    conversation_id: "1",
    body: "Moi!",
    from_user_id: "1",
    created_at: "2016-08-25T10:15:00.670Z",
  },
];

const mockConversationMessages2 = [
  {
    id: "2",
    conversation_id: "2",
    body: "Hello!",
    from_user_id: "3",
    created_at: "2016-08-24T10:15:00.670Z",
  },
];

const mockConversationMessages3 = [
  {
    id: "3",
    conversation_id: "3",
    body: "Hi!",
    from_user_id: "1",
    created_at: "2016-08-23T10:15:00.670Z",
  },
  {
    id: "7",
    conversation_id: "3",
    body: "Waddap!",
    from_user_id: "4",
    created_at: "2016-08-23T10:14:00.670Z",
  },
];

const mockConversationMessages4 = [
  {
    id: "4",
    conversation_id: "4",
    body: "Morning!",
    from_user_id: "5",
    created_at: "2016-08-22T10:15:00.670Z",
  },
];

const mockConversationMessages5 = [
  {
    id: "5",
    conversation_id: "5",
    body: "Pleep!",
    from_user_id: "6",
    created_at: "2016-08-21T10:15:00.670Z",
  },
];

const mockConversationWithMessages = [
  mockConversationMessages1,
  mockConversationMessages2,
  mockConversationMessages3,
  mockConversationMessages4,
  mockConversationMessages5,
];

const mockUser1 = {
  id: "1",
  username: "John",
  avatar_url: "http://placekitten.com/g/300/300",
};

const mockUser2 = {
  id: "2",
  username: "Amy",
  avatar_url: "http://placekitten.com/g/301/301",
};

const mockUser3 = {
  id: "3",
  username: "Jeremy",
  avatar_url: "http://placekitten.com/g/302/302",
};

const mockUser4 = {
  id: "4",
  username: "Hannah",
  avatar_url: "http://placekitten.com/g/303/303",
};

const mockUser5 = {
  id: "5",
  username: "Charles",
  avatar_url: "http://placekitten.com/g/304/304",
};

const mockUser6 = {
  id: "6",
  username: "George",
  avatar_url: "http://placekitten.com/g/305/305",
};

const mockUsers = [mockUser1, mockUser3, mockUser5, mockUser6];

const expectedRecentConversationSummaries = [
  {
    id: "1",
    latest_message: {
      id: "1",
      body: "Moi!",
      from_user: {
        id: "1",
        avatar_url: "http://placekitten.com/g/300/300",
      },
      created_at: "2016-08-25T10:15:00.670Z",
    },
  },
  {
    id: "2",
    latest_message: {
      id: "2",
      body: "Hello!",
      from_user: {
        id: "3",
        avatar_url: "http://placekitten.com/g/302/302",
      },
      created_at: "2016-08-24T10:15:00.670Z",
    },
  },
  {
    id: "3",
    latest_message: {
      id: "3",
      body: "Hi!",
      from_user: {
        id: "1",
        avatar_url: "http://placekitten.com/g/300/300",
      },
      created_at: "2016-08-23T10:15:00.670Z",
    },
  },
  {
    id: "4",
    latest_message: {
      id: "4",
      body: "Morning!",
      from_user: {
        id: "5",
        avatar_url: "http://placekitten.com/g/304/304",
      },
      created_at: "2016-08-22T10:15:00.670Z",
    },
  },
  {
    id: "5",
    latest_message: {
      id: "5",
      body: "Pleep!",
      from_user: {
        id: "6",
        avatar_url: "http://placekitten.com/g/305/305",
      },
      created_at: "2016-08-21T10:15:00.670Z",
    },
  },
];

module.exports = {
  mockConversations,
  mockConversationMessages1,
  mockConversationMessages2,
  mockConversationMessages3,
  mockConversationMessages4,
  mockConversationMessages5,
  mockConversationWithMessages,
  mockUser1,
  mockUser2,
  mockUser3,
  mockUser4,
  mockUser5,
  mockUser6,
  mockUsers,
  expectedRecentConversationSummaries,
};
