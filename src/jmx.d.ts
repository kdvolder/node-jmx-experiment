// Some ts declarations to allow using jmx library.
// THESE ARE STILL VERY INCOMPLETE
// We can add more attributes / options etc as we need them.
interface JmxClientOptions {
  host?: string;
  port: number;
}

type Callback0 = () => void;
type Callback1 = (arg: any) => void;
type ErrorHandler = (error: any) => void;

interface JmxClient {
  connect(): void;

  on(event: 'connect' | 'disconnect', handler: Callback0): void;
  on(event: 'error', handler: ErrorHandler): void;

  getAttribute(
    mbean: string,
    attributes: string | string[],
    callback: Callback1
  ): void;
}

declare module 'jmx' {
  function createClient(options: JmxClientOptions): JmxClient;
}
