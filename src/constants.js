'use strict';

module.exports = {
  DEFAULT_COMMAND: `--help`,
  DEFAULT_LOCAL_PORT: 3000,
  DEFAULT_PORT: 8080,
  FILE_NAME: `mocks.json`,
  GENERATED_ID_LENGTH: 6,
  NOT_FOUND_MSG: `Not found`,
  PUBLIC_DIR: `public`,
  USER_ARGV_INDEX: 2,
  ExitCode: {
    ERROR: 1,
    SUCCESS: 0
  },
  LogMode: {
    DEFAULT: {
      color: `white`,
      method: `log`
    },
    ERROR: {
      color: `red`,
      method: `error`,
      exitCode: `ERROR`
    },
    HELP: {
      color: `gray`,
      method: `info`
    },
    INFO: {
      color: `blue`,
      method: `info`
    },
    SUCCESS: {
      color: `green`,
      method: `info`,
      exitCode: `SUCCESS`
    }
  }
};
