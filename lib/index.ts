import {
  BlockBlobClient,
  StorageSharedKeyCredential,
} from "@azure/storage-blob";
import { createCustomRunner, initEnv } from "nx-remotecache-custom";

const ENV_CONNECTION_STRING = "NXCACHE_AZURE_CONNECTION_STRING";
const ENV_ACCOUNT_KEY = "NXCACHE_AZURE_ACCOUNT_KEY";
const ENV_ACCOUNT_NAME = "NXCACHE_AZURE_ACCOUNT_NAME";
const ENV_CONTAINER = "NXCACHE_AZURE_CONTAINER";
const ENV_AZURE_URL = "NXCACHE_AZURE_URL";

const getEnv = (key: string) => process.env[key];

function getBlockBlobClient(filename: string, options: AzureBlobRunnerOptions) {
  const connectionString =
    getEnv(ENV_CONNECTION_STRING) ?? options.connectionString;
  const accountKey = getEnv(ENV_ACCOUNT_KEY) ?? options.accountKey;
  const accountName = getEnv(ENV_ACCOUNT_NAME) ?? options.accountName;
  const container = getEnv(ENV_CONTAINER) ?? options.container;

  if (!container) {
    throw Error(
      "Did not pass valid container. Supply the container either via env or nx.json."
    );
  }

  if (connectionString) {
    return new BlockBlobClient(connectionString, container, filename);
  }

  if (accountKey && accountName) {
    const defaultUrl = `https://${accountName}.blob.core.windows.net`;
    const basePath = getEnv(ENV_AZURE_URL) ?? options.azureUrl ?? defaultUrl;
    const fullUrl = `${basePath}/${container}/${filename}`;

    const credential = new StorageSharedKeyCredential(accountName, accountKey);
    return new BlockBlobClient(fullUrl, credential);
  }

  throw Error(
    `Did not pass valid credentials. Supply them either via env or nx.json.`
  );
}

interface AzureBlobRunnerOptions {
  connectionString: string;
  accountKey: string;
  accountName: string;
  container: string;
  azureUrl: string;
}

export default createCustomRunner<AzureBlobRunnerOptions>(async (options) => {
  initEnv(options);
  const blob = (filename: string) => getBlockBlobClient(filename, options);

  return {
    name: "Azure Blob Storage",
    fileExists: (filename) => blob(filename).exists(),
    retrieveFile: async (filename) =>
      (await blob(filename).download()).readableStreamBody!,
    storeFile: (filename, stream) => blob(filename).uploadStream(stream),
  };
});
