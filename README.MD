# Take Home Coding Challenge - Latest Conversations

## Overview

This task is a take home coding challenge for a developer position at a software company.

The problem is to convert conversations, messages and user data from several API endpoints into a list of the most recent messages.

The real API URLs has been removed, so the only way to run the code is with mocked API endpoints through the tests.

In order to setup and run the application do the following:

- `yarn`
- `yarn test`

This installs the third-party dependencies as well as runs the tests.

## Application walk-through

The solution can be found in `./src/latestConversations.js` and tests can be found in `./src/__tests__/latestConversations.test.js`.

We are using a 'DataLoader' to handle the REST API calls, in this case only GET requests. As there can be many requests e.g. to fetch all the messages for a conversation we chunk the requests if they are many. The main reason is to prevent errors such as 429 Too Many Requests.

Each set of endpoints are handled by two classes, Conversation and User, and the API calls related to these are found under each class.

The logic to group conversations, messages and user information is then handled in the `getRecentConversationSummaries` function. It is a multi-step process that fetches and transforms the data into the expected format.

For more information about the task, see the next section that that contains the original task description.

## Original task description

```
/*
* Implement a function that returns the summary of the current user's latest conversations,
* sorted by the latest message's timestamp (most recent conversation first).
*
* Make sure to have good unit tests in addition to the provided integration test!
*
* You have the following REST API available (base URL provided as a constant):
*
* Get current user's conversations: GET /conversations
* Get messages in a conversation: GET /conversations/:conversation_id/messages
* Get user by ID: GET /users/:user_id
*
* The result should be an array of objects of the following shape/type:
* {
*   id : string;
*   latest_message: {
*     body : string;
*     from_user : {
*       id: string;
*       avatar_url: string;
*     };
*     created_at : ISOString;
*   };
* }
*
*/
const API_BASE_URL = "https://example.com/api"; // the 'real' API URL is removed

async function getRecentConversationSummaries () {
  // TODO: Implement this
}

// Configure Mocha, telling both it and chai to use BDD-style tests.
mocha.setup("bdd");
chai.should();

describe('getRecentConversationSummaries()', () => {
	it('should return the current user\'s latest conversations sorted by latest message\'s timestamp', async () => {
    const result = await getRecentConversationSummaries();
    result.should.deep.equal([
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
    ]);
  });

  // TODO: Add more tests
});

// Run all our test suites.  Only necessary in the browser.
mocha.run();
```
