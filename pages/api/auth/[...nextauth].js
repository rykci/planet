import NextAuth from 'next-auth'
import FacebookProvider from 'next-auth/providers/facebook'
import { FirestoreAdapter } from '@next-auth/firebase-adapter'
import firebaseConfig from '../../../firebase/firebase'

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],
  adapter: FirestoreAdapter(firebaseConfig),
  // ...
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id

      return session
    },
  },
})
