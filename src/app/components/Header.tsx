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

import Image from 'next/image';
import Link from 'next/link';

export const Header = () => {
  return (
    <header className="w-full py-6 px-8 bg-white shadow-[0_2px_4px_0_rgba(0,0,0,0.1)]">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="CDP SDK Logo" width={120} height={40} />
        </Link>
        <ul className="flex space-x-6 items-center">
          <li>
            <span
              className="text-gray-700 text-xl"
              role="img"
              aria-label="lightbulb"
            >
              💡
            </span>
          </li>
          <li>
            <a
              href="https://irl.travel"
              className="text-gray-700 hover:text-blue-600 transition-colors text-2xl"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="IRL Travel"
            >
              🛂
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
