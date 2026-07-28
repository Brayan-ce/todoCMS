# No Build, Dev, or Install

## Description
Prohíbe ejecutar `npm run build`, `npm run dev`, `next build`, `next dev`, o instalar dependencias (`npm install`, `npm ci`, `pnpm install`, `yarn`) sin permiso explícito del usuario.

## Rules
- NEVER run `npm run build`, `npx next build`, `npm run dev`, `npx next dev`, or any similar build/dev command unless the user explicitly asks for it.
- NEVER install dependencies (`npm install`, `npm ci`, `pnpm install`, `yarn add`, `yarn install`) unless the user explicitly asks for it.
- If you need to test or verify something, ask the user to run the command themselves.
- This applies to any package manager or build tool.
