import * as TsConfig from '../tsconfig.json';

export const moduleNameMapper = Object.fromEntries(
  Object.entries(TsConfig.compilerOptions.paths)
    .map(([key, value]) => [
      key.replace('/*', '/(.*)'),
      value[0].replace('./', '<rootDir>/').replace('/*', '/$1'),
    ]),
);
