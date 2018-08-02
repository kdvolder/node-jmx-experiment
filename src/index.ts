import * as jmx from 'jmx';
import { resolve } from 'url';

function connect(): Promise<JmxClient> {
  return new Promise((resolve, reject) => {
    const client = jmx.createClient({
      host: 'localhost',
      port: 9999,
    });
    client.on('connect', () => {
      resolve(client);
    });
    client.on('error', reject);
    client.connect();
  });
}

function getAttribute(
  client: JmxClient,
  mbean: string,
  attrib: string
): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    client.getAttribute(mbean, attrib, data => {
      resolve(data);
    });
    //TODO: from the docs, its unclear to me how (or even if)
    // client.getAttribute signals errors. Should try this out
    // and see what happens with unknown attributes, for example.
  });
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
}

main().catch(err => {
  console.log(err.toString());
});
