# Changelog

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 5.0.1

### Fixed

- Fixes [#26](https://github.com/NiklasPor/nx-remotecache-custom/issues/26) (`local cache artifact in "*" was not been generated on this machine`) error.

## 5.0.0

### Breaking Change

- Nx support now starts at `16.9.0` (due to breaking internal cache changes).

## 4.2.2

### Chore

- Dependy bump & cleanup.

## 4.2.1

### Fixed

- Fixed `zlib: unexpected end of file` error for version Node 18.

## 4.2.0

### Added

- Added Azure Active Directory authentication. Enable it via `NXCACHE_AZURE_AD_AUTH` flag or directly with the `adAuth` attribute. Thanks to [@pearsonradu](https://github.com/pearsonradu).

### Fixed

- Support for Nx version 16.6.0+ by removing the machine id from stored artifacts.
- `read` and `write` flags now prioritize environment variables over the `nx.json`.

## 4.1.0

### Added

- Options `read` and `write` now allow to disable reading and writing from / to the remote cache separately.

## 4.0.0

### Breaking Changes

- Nx support now starts at 16.0.0

## 3.1.0

### Added

- Container access can now be configured with a SAS-Container-URL. Provide it via env `NXCACHE_AZURE_SAS_URL` or directly inside the options with the `sasUrl` attribute. Thanks to [@kraiz](https://github.com/kraiz).

## 3.0.0

### Breaking Changes

- Environment variables now start with `NXCACHE_` instead of `NX_CACHE_` to prevent leaking credentials

## 2.0.0

### Breaking Changes

- Implementation is now stream based to reduce memory overhead.
- All file system writes are now fully asynchronous.
- Filenames are now suffixed to prevent incorrect cache hits with older version

## 1.1.0

### Added

- Added `name` task runner option and `NXCACHE_NAME` env variable to set a custom cache name

## 1.0.0

### Added

- Added `initEnv(options)` function for reading environment variables from `.env`

## 0.0.8

### Chore

- Bump `nx-remotecache-custom` to `^0.0.5`

## 0.0.7

### Fixed

- #1 Fix problems when connecting via connection string – thanks to @Sobuno

## 0.0.6

### Fixed

- Env variable `NXCACHE_AZURE_CONTAINER` is now parsed correctly

## 0.0.5

### Changed

- Bump `ngx-remotecache-custom` version to `0.0.4`

## 0.0.3

### Changed

- Bump `ngx-remotecache-custom` version to `0.0.3`

## 0.0.2

### Changed

- Bump `ngx-remotecache-custom` version to `0.0.2`
- Change `ngx-remotecache-custom` from dependency to peerDependency

## 0.0.1

### Added

- Initial release of `ngx-remotecache-azure`
