import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      fistName: String;
      lastName: String;
      role: String;
    } & Session['user'];
    //
  }
}
