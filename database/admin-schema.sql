CREATE TABLE IF NOT EXISTS ddc_admin_content_items (
  collection_key VARCHAR(64) NOT NULL,
  item_id VARCHAR(191) NOT NULL,
  data LONGTEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (collection_key, item_id),
  INDEX idx_ddc_admin_content_collection_order (collection_key, sort_order),
  INDEX idx_ddc_admin_content_collection_updated (collection_key, updated_at)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS ddc_admin_site_settings (
  id TINYINT UNSIGNED NOT NULL PRIMARY KEY,
  data LONGTEXT NOT NULL,
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
