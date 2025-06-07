/**
 * Copyright 2025-present Coinbase Global, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { neon } from '@neondatabase/serverless';
import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NeonAdapter } from '@/lib/auth/adapter';

// Initialize Neon database connection with error handling
let sql;
try {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set');
  }
  sql = neon(process.env.DATABASE_URL);
} catch (error) {
  console.error('Failed to initialize Neon database connection:', error);
  throw error;
}

// Extend session types
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      role?: string;
    } & DefaultSession['user'];
  }
}

// Merge with existing auth options
const enhancedAuthOptions: NextAuthOptions = {
  ...authOptions,
  adapter: NeonAdapter(sql),
  callbacks: {
    ...authOptions.callbacks,
    async session({ session, user, token }) {
      // First call the original session callback if it exists
      const originalSession = authOptions.callbacks?.session
        ? await authOptions.callbacks.session({ session, user, token })
        : session;

      if (originalSession.user) {
        originalSession.user.id = user?.id || token.sub;
        if (token.email) {
          originalSession.user.email = token.email;
        }
      }

      return originalSession;
    },
  },
  events: {
    ...authOptions.events,
    async error(message) {
      console.error('Authentication error:', message.error);
    },
  },
};

const handler = NextAuth(enhancedAuthOptions);

export { handler as GET, handler as POST };