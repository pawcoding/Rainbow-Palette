// @ts-check
const eslint = require('@eslint/js');
const stylisticTs = require('@stylistic/eslint-plugin-ts');
const angular = require('angular-eslint');
const tailwind = require('eslint-plugin-tailwindcss');
const tseslint = require('typescript-eslint');

// TODO: Add Storybook plugin when available
// https://github.com/storybookjs/eslint-plugin-storybook/pull/156

module.exports = tseslint.config(
  {
    files: ['**/*.ts'],
    plugins: {
      '@stylistic/ts': stylisticTs
    },
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended
    ],
    processor: angular.processInlineTemplates,
    rules: {
      // Angular specific rules
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'rp',
          style: 'camelCase'
        }
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'rp',
          style: 'kebab-case'
        }
      ],
      // TypeScript specific rules
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ],
      '@typescipt-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/array-type': [
        'error',
        {
          default: 'generic'
        }
      ],
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'explicit'
        }
      ],
      '@typescript-eslint/no-empty-function': 'off',
      // ESLint rules
      'comma-dangle': ['error'],
      'no-debugger': 'off',
      semi: 'error',
      // Stylistic rules
      '@stylistic/ts/member-delimiter-style': [
        'error',
        {
          multiline: {
            delimiter: 'semi',
            requireLast: true
          },
          singleline: {
            delimiter: 'semi',
            requireLast: false
          }
        }
      ]
    }
  },
  {
    files: ['**/*.html'],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
      ...tailwind.configs['flat/recommended']
    ],
    rules: {
      // Angular specific rules
      '@angular-eslint/template/attributes-order': [
        'error',
        {
          alphabetical: true,
          order: [
            'STRUCTURAL_DIRECTIVE',
            'TEMPLATE_REFERENCE',
            'INPUT_BINDING',
            'TWO_WAY_BINDING',
            'OUTPUT_BINDING',
            'ATTRIBUTE_BINDING'
          ]
        }
      ],
      '@angular-eslint/template/prefer-self-closing-tags': 'error',
      // Tailwind specific rules
      'tailwindcss/classnames-order': [
        'error',
        {
          removeDuplicates: true,
          skipClassAttributes: false
        }
      ],
      'tailwindcss/no-contradicting-classname': 'error',
      'tailwindcss/enforces-shorthand': 'error',
      'tailwindcss/no-custom-classname': 'off'
    }
  }
);
