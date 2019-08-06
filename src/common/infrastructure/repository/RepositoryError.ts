import Optional from 'optional-js'

interface RepositoryErrorData {
  timestamp: string;
  status: number;
  error: string;
  message: string;
}

export default class RepositoryError {
  public static of(e?: RepositoryErrorData) {
    return new RepositoryError(e);
  }

  private _timestamp: string = new Date().toISOString();
  private _status: number = -1;
  private _error: string = "Unknown error.";
  private _message: string = "Unknown message.";

  public get timestamp() {
    return this._timestamp;
  }

  public get status() {
    return this._status;
  }

  public get error() {
    return this._error;
  }

  public get message() {
    return this._message;
  }

  private constructor(e?: RepositoryErrorData) {
    const errorData = Optional.ofNullable(e);

    this._timestamp = errorData.map(({ timestamp }) => timestamp).orElse(this.timestamp);
    this._status = errorData.map(({ status }) => status).orElse(this.status);
    this._error = errorData.map(({ error }) => error).orElse(this.error);
    this._message = errorData.map(({ message }) => message).orElse(this.message);
  }
}