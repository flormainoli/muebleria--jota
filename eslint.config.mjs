import js from "@eslint/js";

export default [
    js.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                window: "readonly",
                document: "readonly",
                customElements: "readonly",
                HTMLElement: "readonly",
                console: "readonly",
                setInterval: "readonly",
                clearInterval: "readonly",
                Promise: "readonly",
                setTimeout: "readonly"
            }
        },
        rules: {
            "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }]
        }
    }
];
