module.exports = {
    preset: "ts-jest",
    collectCoverage: true,
    collectCoverageFrom: ["src/{renderer}/**/*.{js,jsx,ts,tsx}"],
    coverageReporters: ["lcov"]
};