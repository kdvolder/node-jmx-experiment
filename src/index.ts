import * as jmx from 'jmx';
import { resolve } from 'url';
import { on } from 'cluster';

function doFinally<T>(p: Promise<T>, handler: () => void) {
    //Not sure why, but Promise.finally method doesn't seem to work (too old nodejs?)
    // So make our own function to do that instead.
    return p.then(
        (v) => {
            handler();
            return v;
        },
        (e) => {
            handler();
            throw e;
        }
    );
}

function connect(): Promise<JmxClient> {
    let rejector: ErrorHandler;
    const client = jmx.createClient({
        host: 'localhost',
        port: 9999,
    });
    const p = new Promise<JmxClient>((resolve, reject) => {
        rejector = reject;
        client.on('connect', () => {
            resolve(client);
        });
        client.on('error', reject);
        client.connect();
    });
    return doFinally(p, () => {
        client.removeListener('error', rejector)
    });
}

function getAttribute(
  client: JmxClient,
  mbean: string,
  attrib: string
): Promise<any> {
  let rejector: ErrorHandler;
  const p = new Promise<any>((resolve, reject) => {
    rejector = reject;
    client.on('error', reject);
    client.getAttribute(mbean, attrib, data => {
      resolve(data);
    });
  });
  return doFinally(p, () => client.removeListener('error', rejector));
}

function performOperation(
  client: JmxClient,
  mbean: string,
  operation: string,
  arg: string
) : Promise<any> {
  let rejector : ErrorHandler;
  const p = new Promise<any>((resolve, reject) => {
    rejector = reject;
    client.on('error', reject);
    client.invoke(mbean, operation, [arg], data => {
      resolve(data);
    });
  });
  return doFinally(p, () => client.removeListener('error', rejector));
}

async function main(): Promise<void> {
  let client = await connect();
  console.log('Client Connected!');
  let memBean = await getAttribute(
    client,
    'java.lang:type=Memory',
    'HeapMemoryUsage'
  );
  let usedPromise = new Promise<string>((resolve, reject) => {
    memBean.get('used', (error: any, data: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
  console.log('HeapMemoryUsage used: ' + (await usedPromise));

  let port = await performOperation(client, "org.springframework.boot:type=Admin,name=SpringApplication", 
    "getProperty", 
    "local.server.port"
  );
  console.log("port = "+port);
}

main().catch(err => {
  console.log(err.toString());
});
