import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  {
    ignores: [
      'dist/**',
      'release/**',
      'coverage/**',
      'node_modules/**',
    ],
  },

  // React renderer
  {
    files: ['renderer/src/**/*.{js,jsx}'],

    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',

      globals: {
        ...globals.browser,
      },

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },

    settings: {
      react: {
        version: 'detect',
      },
    },

    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,

      'react/prop-types': 'off',
      'react/no-unescaped-entities': 'off',
       'react-refresh/only-export-components': 'off',
      // 'react-refresh/only-export-components': [
      //   'warn',
      //   {
      //     allowConstantExport: true,
      //   },
      // ],

      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },

  // Jest + React Testing Library
  {
    files: [
      'renderer/src/**/__tests__/**/*.{js,jsx}',
      'renderer/src/**/*.{test,spec}.{js,jsx}',
      'renderer/src/test/**/*.{js,jsx}',
    ],

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
      },
    },
  },

  // Electron main/preload
  {
    files: ['electron/**/*.cjs'],

    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',

      globals: {
        ...globals.node,
      },
    },

    rules: {
      ...js.configs.recommended.rules,
    },
  },

  // Build/configuration files
  {
    files: [
      'vite.config.js',
      'eslint.config.js',
    ],

    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',

      globals: {
        ...globals.node,
      },
    },

    rules: {
      ...js.configs.recommended.rules,
    },
  },
]