# ADR-005: Object Storage for Photo Assets / 照片资产对象存储

## Status / 状态

Accepted with deferred detail.

已接受，细节待定。

## Date / 日期

2026-08-07

## Context / 背景

The product will eventually handle public gallery images, private original photos, private final retouched photos, and generated zip packages. Client files have 7-day and 3-month lifecycle rules and must not be publicly accessible by default.

产品后续会处理公开作品图片、私有底片、私有最终精修图和已生成压缩包。客户文件有 7 天和 3 个月生命周期规则，并且默认不能公开访问。

Storing photos long-term on the application server disk would make backup, deletion, scaling, and download security harder.

长期把照片存放在应用服务器磁盘上，会增加备份、删除、扩展和下载安全的难度。

## Decision / 决策

Store photo files and generated zip packages in object storage. Do not store long-lived client photo files on the application server disk.

照片文件和已生成压缩包存储在对象存储中。不要把长期客户照片文件存放在应用服务器磁盘上。

Tencent Cloud COS is the preferred production candidate, but final bucket design and lifecycle configuration remain deferred.

腾讯云 COS 是生产优先候选，但最终 bucket 设计和生命周期配置仍待定。

## Rationale / 理由

- Object storage is a better fit for large photo files and generated archives.
- Private signed URLs can support temporary upload and download access.
- Database records can keep file metadata while object storage holds bytes.
- Deletion jobs can coordinate product status and physical object deletion.

- 对象存储更适合大型照片文件和已生成归档文件。
- 私有签名 URL 可以支持临时上传和下载访问。
- 数据库记录文件元数据，对象存储保存文件内容。
- 删除任务可以协调产品状态和物理对象删除。

## Consequences / 影响

- Backend APIs must issue scoped upload/download access.
- Private file object keys must not become stable public API contracts.
- 3-month expiry jobs must delete originals, finals, and generated packages together from product storage.
- Server disk should only be used for temporary processing, cache, logs, and deployment artifacts.

- 后端 API 必须签发受限上传/下载访问。
- 私有文件 object key 不应成为稳定公开 API 契约。
- 3 个月过期任务必须从产品存储中一起删除底片、最终图和已生成压缩包。
- 服务器磁盘只应用于临时处理、缓存、日志和部署产物。

## Related Documents / 相关文档

- `wiki/architecture/technical-architecture-draft.md`
- `wiki/architecture/api-contract-draft.md`
- `wiki/architecture/database-schema-draft.md`
