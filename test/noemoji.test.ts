import { expect, test, describe, mock } from "bun:test";
import Logger from "../src/index";

function _date() {
  return new Date().toLocaleTimeString();
}

const logger = new Logger();
const styles = logger.styles;

console.error = mock(console.error);
console.log = mock(console.log);

describe("No Emoji", () => {
  test("INFO", () => {
    logger.info("This is an info message!");
    expect(console.log).toHaveBeenCalledWith(
      `${styles.date(`[${_date()}]`)} ${styles.info("INFO")} ${styles.message("This is an info message!")}`,
    );
  });

  test("SUCCESS", () => {
    logger.success("This is a success message!");
    expect(console.log).toHaveBeenCalledWith(
      `${styles.date(`[${_date()}]`)} ${styles.success("SUCCESS")} ${styles.message("This is a success message!")}`,
    );
  });

  test("WARN", () => {
    logger.warn("This is a warning!");
    expect(console.log).toHaveBeenCalledWith(
      `${styles.date(`[${_date()}]`)} ${styles.warn("WARN")} ${styles.message("This is a warning!")}`,
    );
  });

  test("ERROR", () => {
    logger.error("This is an error!");
    expect(console.error).toHaveBeenCalledWith(
      `${styles.date(`[${_date()}]`)} ${styles.error("ERROR")} ${styles.message("This is an error!")}`,
    );
  });

  test("ERROR WITH ERROR CLASS", () => {
    let error = new Error("This is an error!");
    logger.error(error);
    expect(console.error).toHaveBeenCalledWith(
      // @ts-ignore
      `${styles.date(`[${_date()}]`)} ${styles.error("ERROR")} ${styles.message(error.stack)}`,
    );
  });

  test("LOG", () => {
    logger.log("This is a log message!");
    expect(console.log).toHaveBeenCalledWith(
      `${styles.date(`[${_date()}]`)} ${styles.log("LOG")} ${styles.message("This is a log message!")}`,
    );
  });

  test("DEBUG", () => {
    logger.debug("This is a debug message!");
    expect(console.log).toHaveBeenCalledWith("This is a debug message!");
  });
});
