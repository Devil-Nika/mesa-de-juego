// eslint.config.mjs
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
    globalIgnores(['dist']),

    {
        files: ['**/*.{ts,tsx}'],
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            reactHooks.configs['recommended-latest'],
            reactRefresh.configs.vite,
        ],
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: 'module',
            globals: globals.browser,
        },
        settings: {
            // Para que ESLint entienda los alias del tsconfig
            'import/resolver': {
                typescript: {
                    project: './tsconfig.app.json',
                },
            },
        },
    },

    // Overrides para archivos CJS o configs en CommonJS
    {
        files: ['**/*.cjs', '**/*.config.{js,cjs,ts}'],
        languageOptions: { sourceType: 'commonjs' },
        rules: {
            'react-refresh/only-export-components': 'off',
        },
    },
])
