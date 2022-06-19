# [Genshin List](https://genshin-list.vercel.app)

Genshin List is a web app to help filter and display characters from the game Genshin Impact. The character cards can be clicked on to see a more in-depth description of stats, facts, and abilities. Each character's page includes a calculator that lists the required materials to level up, ascend and upgrade talents within a given range.

Built with [Next.js](https://nextjs.org/), [TypeScript](https://www.typescriptlang.org/), and [Tailwind CSS](https://tailwindcss.com/)

![genshin-list-demo](https://user-images.githubusercontent.com/44013073/174478424-8ddb7914-504e-42ce-b9bb-33210e1dd116.jpg)

## Getting Started

1. Install and use the correct version of Node using [NVM](https://github.com/nvm-sh/nvm):

   ```bash
   nvm use
   nvm install
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How To Update Characters

1. Update the [genshin-db](https://github.com/theBowja/genshin-db) dependency:

   ```bash
   npm update genshin-db --save
   ```

2. Check if the characters were added and if their page is displaying the correct information.

   > **_NOTE:_** You may need to restart your local server to see changes.

3. Make sure everything else is still working correctly.
