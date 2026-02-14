import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/naming-convention': [
        'error',
        // prywatne pola klas
        {
          selector: 'property',
          modifiers: ['private'],
          format: ['camelCase'],
          leadingUnderscore: 'require', // wymaga _ na początku
        },
        {
          selector: 'variableLike',
          format: ['camelCase'],
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
        {
          selector: 'enumMember',
          format: ['PascalCase'],
        },

        // metody publiczne klas
        {
          selector: 'method',
          modifiers: ['public'],
          format: ['camelCase'],
        },

        // zwykłe funkcje
        {
          selector: 'function',
          format: ['camelCase'],
        },

        // {
        //   selector: "variable",
        //   modifiers: ["const"],
        //   format: ["UPPER_CASE"]
        // },
      ],
    },
  },
];
