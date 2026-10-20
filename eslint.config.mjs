import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import globals from 'globals';
export default defineConfig([
 {ignores:['out/**','.next/**','.next-dev/**','next-env.d.ts']},
 js.configs.recommended,
 ...tseslint.configs.recommended,
 reactHooks.configs.flat.recommended,
 jsxA11y.flatConfigs.recommended,
 {languageOptions:{globals:{...globals.browser,...globals.node}},rules:{'jsx-a11y/no-noninteractive-tabindex':['error',{roles:['region']}]}},
]);
