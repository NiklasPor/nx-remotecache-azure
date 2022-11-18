# Changelog

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
