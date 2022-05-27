[![npm package link](https://img.shields.io/npm/v/nx-remotecache-azure)](https://www.npmjs.com/package/nx-remotecache-azure)

# nx-remotecache-azure

A task runner for [@nrwl/nx](https://nx.dev) that uses an Azure Blob Storage as a remote cache. This enables all team members and CI servers to share a single cache. The concept and benefits of [computation caching](https://nx.dev/angular/guides/computation-caching) are explained in the NX documentation.

This package was built with [nx-remotecache-custom](https://www.npmjs.com/package/nx-remotecache-custom) 🙌

## Setup

```
npm install --save-dev nx-remotecache-azure
```

| Parameter         | Description                                                             |  Environment Variable / .env       | `nx.json`          |
| ----------------- | ----------------------------------------------------------------------- | ---------------------------------- | ------------------ |
| Connection String | Connect to an Azure Storage blob via a single URL.                      | `NX_CACHE_AZURE_CONNECTION_STRING` | `connectionString` |
| Account Name      | Use together with Account Key for Azure Credentials Authentication      | `NX_CACHE_AZURE_ACCOUNT_NAME`      | `accountName`      |
| Account Key       | Use together with Account Name for Azure Credentials Authentication     | `NX_CACHE_AZURE_ACCOUNT_KEY`       | `accountKey`       |
| Container         | Required. Specify which container should be used for storing the cache. | `NX_CACHE_AZURE_CONTAINER`         | `container`        |
| Azure URL         | Optional. Can be used to overwrite Azure URL for local debugging.       | `NX_CACHE_AZURE_URL`               | `azureUrl`         |

```json
{
  "tasksRunnerOptions": {
    "default": {
      "runner": "nx-remotecache-azure",
      "options": {
        // All of the azure specific options can also be inserted via environment variables! ⬆️
        "accountName": "MyAzureAccountName",
        "accountKey": "my-azure-account-key-11223-22..",
        "container": "nx",
        "cacheableOperations": ["build", "test", "lint", "e2e"]
      }
    }
  }
}
```

## Run it 🚀

Running tasks should now show the storage or retrieval from the remote cache:

```
------------------------------------------------------------------------
Built Angular Package
 - from: /Users/name/example-workspace/libs/example-lib
 - to:   /Users/name/example-workspace/dist/libs/example-lib
------------------------------------------------------------------------
------------------------------------------------------------------------
Stored output to remote cache: Azure Blob Storage
Hash: d3d2bea71ea0f3004304c5cc88cf91be50b02bb636ebbdfcc927626fd8edf1ae
------------------------------------------------------------------------
```

## Advanced Configuration

| Option       | Environment Variable / .env | Description                                                                                           |
| ------------ | --------------------------- | ----------------------------------------------------------------------------------------------------- |
| `name`       | `NX_CACHE_NAME`             | Set to provide task runner name for logging. Overrides name provided in implementation.               |
| `verbose`    |                             | Set to receive full stack traces whenever errors occur. Best used for debugging. **Default:** `false` |
| `silent`     |                             | Set to mute success and info logs. **Default:** `false`                                               |
| `dotenv`     |                             | Set to `false` to disable reading `.env` into `process.env`. **Default:** `true`                      |
| `dotenvPath` |                             | Set to read `.env` files from a different folder.                                                     |

```json
"tasksRunnerOptions": {
  "default": {
    "options": {
      "name": "My Storage",
      "verbose": true,
      "silent": true
    }
  }
}
```

## All Custom Runners

| Runner                                                                     | Storage             |
| -------------------------------------------------------------------------- | ------------------- |
| [nx-remotecache-azure](https://www.npmjs.com/package/nx-remotecache-azure) |  Azure Blob Storage |
| [nx-remotecache-minio](https://www.npmjs.com/package/nx-remotecache-minio) |  MinIO Storage      |
