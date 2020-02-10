module.exports = {
    globals: {
        'ts-jest': {
            diagnostics: false,
        },
    },
    preset: "ts-jest",
    collectCoverage: true,
    collectCoverageFrom: ["src/{renderer}/**/*.{js,jsx,ts,tsx}"],
    coverageReporters: ["lcov"]
};