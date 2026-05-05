import js from '@eslint/js';
import globals from 'globals';
import pluginVue from 'eslint-plugin-vue';

import {
    defineConfig
} from 'eslint/config';

export default defineConfig([
    js.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.node,
                ...globals.nodeBuiltin,
                ...globals.mocha,
                ...globals.browser,
                logger: 'readonly',
                I18nMarker: 'readonly',
                $t: 'readonly',
            },
        },
        linterOptions: {
            reportUnusedDisableDirectives: 'off',
        },
        rules: {
            'linebreak-style': ['error', 'unix'],
            'quotes': ['error', 'single', {'avoidEscape': true}],
            'jsx-quotes': ['error', 'prefer-double'],
            'semi': ['error', 'always'],
            'curly': 'error',
            'eqeqeq': ['error', 'always'],
            'no-multi-spaces': 'error',
            'brace-style': ['error', '1tbs', {'allowSingleLine': false}],
            'semi-spacing': ['error', {'before': false, 'after': true}],
            'no-console': 'off',
            'no-multi-assign': 'error',
            'no-irregular-whitespace': 'error',
            'newline-per-chained-call': ['error', {'ignoreChainWithDepth': 5}],
            'array-bracket-spacing': ['error', 'never'],
            'keyword-spacing': ['error', {'before': true}],
            'key-spacing': ['error', {'beforeColon': false, 'afterColon': true}],
            'no-whitespace-before-property': 'error',
            'comma-spacing': ['error', {'before': false, 'after': true}],
            'space-before-blocks': 'error',
            'object-curly-spacing': ['error', 'never'],
            'object-curly-newline': ['error', {
                'ObjectExpression': {'consistent': true},
                'ObjectPattern': {'consistent': true},
                'ImportDeclaration': 'always',
                'ExportDeclaration': 'always'
            }],
            'object-property-newline': ['error', {'allowAllPropertiesOnSameLine': true}],
            'arrow-spacing': 'error',
            'eol-last': ['error', 'always'],
            'space-before-function-paren': ['error', 'never'],
            'space-in-parens': ['error', 'never'],
            'indent': ['error', 4, {'ArrayExpression': 1, 'MemberExpression': 1, 'SwitchCase': 1, 'flatTernaryExpressions': true}],
            'operator-linebreak': ['error', 'after'],
            'space-infix-ops': 'error',
            'space-unary-ops': 'error',
            'spaced-comment': ['error', 'always'],
            'switch-colon-spacing': ['error', {'after': false, 'before': true}],
            'template-tag-spacing': ['error', 'always'],
            'no-trailing-spaces': ['error', {'skipBlankLines': false, 'ignoreComments': false}],
            'array-bracket-newline': ['error', 'consistent'],
        },
    }, {
        files: ['**/*.vue'],
        plugins: {
            pluginVue
        },
        extends: ['pluginVue/flat/recommended'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.browser,
                I18nMarker: 'readonly',
                $t: 'readonly',
                $ref: 'readonly',
                $$: 'readonly',
                $toRef: 'readonly',
                $computed: 'readonly',
            },
        },
        linterOptions: {
            reportUnusedDisableDirectives: 'off',
        },
        rules: {
            'vue/no-unused-vars': 'error',
            'vue/no-v-html': 'off',
            'vue/html-indent': ['error', 4],
            'vue/script-indent': ['error', 4, {
                'baseIndent': 0,
                'switchCase': 1,
                'ignores': []
            }],
            'vue/comma-spacing': ['error', {'before': false, 'after': true}],
            'vue/space-infix-ops': 'error',
            'vue/space-unary-ops': 'error',
            'vue/no-multi-spaces': 'error',
            'vue/no-irregular-whitespace': 'error',
            'vue/no-spaces-around-equal-signs-in-attribute': 'error',
            'vue/component-tags-order': 'off',
            'vue/component-definition-name-casing': 'off',
            'vue/no-mutating-props': 'off',
            'vue/multi-word-component-names': 'off',
            'vue/one-component-per-file': 'off',
            'vue/no-v-for-template-key': 'off',
            'vue/no-multiple-template-root': 'off',
            'vue/no-v-model-argument': 'off',
            'vue/no-lone-template': 0,
            'vue/no-template-shadow': 'off',
            'vue/no-deprecated-slot-attribute': 'off',
        },
    }
]);
