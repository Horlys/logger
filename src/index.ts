import pc from "picocolors";
import { Formatter } from "picocolors/types";

// TODO : logs folder

export default class Logger {
  private _log: (...args: any[]) => void;
  private _error: (...args: any[]) => void;
  private icon: boolean;
  public styles: {
    date: (message: string) => string;
    message: (message: string) => string;
    info: (message: string) => string;
    warn: (message: string) => string;
    error: (message: string) => string;
    log: (message: string) => string;
    success: (message: string) => string;
  } = {
    date: (message: string) => pc.gray(pc.bold(message)),
    message: (message: string) => pc.white(message),
    info: (message: string) => pc.blueBright(pc.bold(message)),
    warn: (message: string) => pc.yellowBright(pc.bold(message)),
    error: (message: string) => pc.redBright(pc.bold(message)),
    log: (message: string) => pc.whiteBright(pc.bold(message)),
    success: (message: string) => pc.greenBright(pc.bold(message)),
  };

  public icons: {
    info: string;
    warn: string;
    error: string;
    log: string;
    success: string;
  } = {
    info: "ℹ️",
    warn: "⚠️",
    error: "✖️",
    log: "ℹ️",
    success: "✔️",
  };

  private defaultConfig: { emoji: boolean } = { emoji: false };

  constructor(config: { emoji: boolean } = this.defaultConfig) {
    this.icon = config.emoji;
    this._log = console.log;
    this._error = console.error;
  }

  info(...args: any[]) {
    this._format([
      this._date(),
      {
        message: `${this.icon ? this.icons.info + " " : ""}INFO`,
        style: this.styles.info,
      },
      ...args.map((arg) => this._formatArg(arg)),
    ]);
  }

  success(...args: any[]) {
    this._format([
      this._date(),
      {
        message: `${this.icon ? this.icons.success + " " : ""}SUCCESS`,
        style: this.styles.success,
      },
      ...args.map((arg) => this._formatArg(arg)),
    ]);
  }

  warn(...args: any[]) {
    this._format([
      this._date(),
      {
        message: `${this.icon ? this.icons.warn + " " : ""}WARN`,
        style: this.styles.warn,
      },
      ...args.map((arg) => this._formatArg(arg)),
    ]);
  }

  error(...args: any[]) {
    this._format(
      [
        this._date(),
        {
          message: `${this.icon ? this.icons.error + " " : ""}ERROR`,
          style: this.styles.error,
        },
        ...args.map((arg) => this._formatArg(arg)),
      ],
      true,
    );
  }

  log(...args: any[]) {
    this._format([
      this._date(),
      {
        message: `${this.icon ? this.icons.log + " " : ""}LOG`,
        style: this.styles.log,
      },
      ...args.map((arg) => this._formatArg(arg)),
    ]);
  }

  debug(...args: any[]) {
    console.log.apply(this, args);
  }

  private _format(
    content: Array<{
      message: string;
      style: Formatter | ((message: string) => string);
    }>,
    error: boolean = false,
  ) {
    let c = content.map(({ message, style }) => style(message)).join(" ");
    let _console = error ? console.error : console.log;
    _console(c);
  }

  private _date() {
    return {
      message: `[${new Date().toLocaleTimeString()}]`,
      style: this.styles.date,
    };
  }

  private _formatArg(arg: any) {
    let message = arg instanceof Error ? arg.stack : arg.toString();
    return {
      message,
      style: this.styles.message,
    };
  }
}
