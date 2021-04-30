[![npm package link](https://img.shields.io/npm/v/nx-remotecache-azure)](https://www.npmjs.com/package/nx-remotecache-azure)

# nx-remotecache-azure

A task runner for [@nrwl/nx](https://nx.dev/react) that uses an Azure Blob Storage as a remote cache. This enables all team members and CI servers to share a single cache. The concept and benefits of [computation caching](https://nx.dev/angular/guides/computation-caching) are explained in the NX documentation.

## Setup

```
npm install --save-dev nx-remotecache-azure
```

| Parameter         | Description                                                             |  Environment Variable              | `nx.json`          |
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

> Note: If `nx-remotecache-azure` is not finding a container with the specificed name, it will create a new one.

## Run it 🚀

Running builds should now the storage or retrieval from the remote cache:

```
------------------------------------------------------------------------
Built Angular Package
 - from: /Users/user/example-workspace/libs/example-lib
 - to:   /Users/user/example-workspace/dist/libs/example-lib
------------------------------------------------------------------------
------------------------------------------------------------------------
Stored output to remote cache: Azure Blob Storage
Hash: d3d2bea71ea0f3004304c5cc88cf91be50b02bb636ebbdfcc927626fd8edf1ae
------------------------------------------------------------------------
```
