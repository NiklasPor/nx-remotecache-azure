import {
  BlobServiceClient,
  StorageSharedKeyCredential,
} from "@azure/storage-blob";
import { createCustomRunner } from "nx-remotecache-custom";

const ENV_CONNECTION_STRING = "NX_CACHE_AZURE_CONNECTION_STRING";
const ENV_ACCOUNT_KEY = "NX_CACHE_AZURE_ACCOUNT_KEY";
const ENV_ACCOUNT_NAME = "NX_CACHE_AZURE_ACCOUNT_NAME";
const ENV_CONTAINER = "NX_CACHE_AZURE_CONTAINER";
const ENV_AZURE_URL = "NX_CACHE_AZURE_URL";

const getEnv = (key: string) => process.env[key];

function getServiceClient(options: AzureBlobRunnerOptions) {
  const connectionString =
    getEnv(ENV_CONNECTION_STRING) ?? options.connectionString;
  const accountKey = getEnv(ENV_ACCOUNT_KEY) ?? options.accountKey;
  const accountName = getEnv(ENV_ACCOUNT_NAME) ?? options.accountName;

  if (connectionString) {
    return BlobServiceClient.fromConnectionString(connectionString);
  }

  if (accountKey && accountName) {
    const defaultUrl = `https://${accountName}.blob.core.windows.net`;
    const url = getEnv(ENV_AZURE_URL) ?? options.azureUrl ?? defaultUrl;

    const credential = new StorageSharedKeyCredential(accountName, accountKey);
    return new BlobServiceClient(url, credential);
  }

  throw Error(
    `Did not pass valid credentials. Supply them either via env or nx.json.`
  );
}

async function getContainerClient(
  serviceClient: BlobServiceClient,
  options: AzureBlobRunnerOptions
) {
  const container = getEnv(ENV_CONTAINER) ?? options.container;

  if (!container) {
    throw Error(
      "Did not pass valid container. Supply the container either via env or nx.json."
    );
  }

  const containerClient = serviceClient.getContainerClient(container);
  await containerClient.createIfNotExists();

  return containerClient;
}

interface AzureBlobRunnerOptions {
  connectionString: string;
  accountKey: string;
  accountName: string;
  container: string;
  azureUrl: string;
}

export default createCustomRunner<AzureBlobRunnerOptions>(async (options) => {
  const serviceClient = getServiceClient(options);
  const containerClient = await getContainerClient(serviceClient, options);

  const blob = (filename: string) =>
    containerClient.getBlockBlobClient(filename);

  return {
    name: "Azure Blob Storage",
    fileExists: (filename) => blob(filename).exists(),
    retrieveFile: (filename) => blob(filename).downloadToBuffer(),
    storeFile: (filename, buffer) => blob(filename).uploadData(buffer),
  };
});
