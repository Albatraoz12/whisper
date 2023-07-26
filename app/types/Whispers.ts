export type WhispersTyps = {
  id: string; // Change 'String' to 'string'
  content: string; // Change 'String' to 'string'
  createdAt: string; // Change 'String' to 'string'
  updatedAt: string; // Change 'String' to 'string'
  authorId: string; // Change 'String' to 'string'
  author: { username: string }; // Change 'String' to 'string'
  comments: {
    createdAt: string;
    id: string;
    title: string;
    user: {
      username: string;
      name: string;
    };
  };
};
