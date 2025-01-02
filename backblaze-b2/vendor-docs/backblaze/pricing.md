# Pricing Organized by API Calls

These details are provided for developers and programmers.

---

## Transactions Class A

**Costs:** Free

### B2 Native API

- b2_cancel_large_file
- b2_delete_bucket
- b2_delete_file_version
- b2_delete_key
- b2_finish_large_file
- b2_get_upload_part_url
- b2_get_upload_url
- b2_hide_file
- b2_start_large_file
- b2_update_file_legal_hold
- b2_update_file_retention
- b2_upload_file
- b2_upload_part

### S3 Compatible API

- AbortMultipartUpload
- CreateMultipartUpload
- CompleteMultipartUpload
- DeleteBucket
- DeleteObject
- DeleteObjects
- PutObject
- PutObjectLegalHold
- PutObjectLockConfiguration
- PutObjectRetention
- UploadPart

**Note:**\
There is no charge to send data (upload) to Backblaze B2. Once uploaded, storage
charges apply after the first 10GB at **$0.006/GB/month**.

---

## Transactions Class B

**Cost:** First 2,500 of these calls are free each day, then **$0.004 per
10,000**.

### B2 Native API

- b2_download_file_by_id
- b2_download_file_by_name
- b2_get_file_info

### S3 Compatible API

- GetObject
- GetObjectLegalHold
- GetObjectLockConfiguration
- GetObjectRetention
- HeadObject

### Outbound Calls

- Event Notification

**Note:**\
Unlimited data egress, including free egress up to 3× your monthly average
storage. Additional egress is priced at **$0.01/GB**.

---

## Transactions Class C

**Cost:** First 2,500 of these calls are free each day, then **$0.004 per
1,000**.

### B2 Native API

- b2_authorize_account
- b2_copy_file
- b2_copy_part
- b2_create_bucket
- b2_create_key
- b2_get_download_authorization
- b2_list_buckets
- b2_list_file_names
- b2_list_file_versions
- b2_list_keys
- b2_list_parts
- b2_list_unfinished_large_files
- b2_update_bucket
- b2_get_bucket_notification_rules
- b2_set_bucket_notification_rules

### S3 Compatible API

- CopyObject (Put Object Copy)
- CreateBucket
- DeleteBucketCors
- DeleteBucketEncryption
- GetBucketAcl (List Objects)
- GetBucketCors
- GetBucketEncryption
- GetBucketLocation
- GetBucketVersioning
- GetObjectAcl
- HeadBucket
- ListBuckets
- ListMultipartUploads
- ListObjectsV2
- ListObjectVersions
- ListParts
- PutBucketAcl
- PutBucketCors
- PutBucketEncryption
- PutObjectAcl
- UploadPartCopy
