import Logger from "../src";

const logger = new Logger({
  emoji: false,
});

// Info
logger.info("This is an info message");
// Success
logger.success("This is a success message");
// Warning
logger.warn("This is a warning message");
// Error
logger.error("This is an error message");
// Log
logger.log("This is a log message");
// Debug
logger.debug("This is a debug message");
