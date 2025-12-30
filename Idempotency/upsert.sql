INSERT INTO inventory (item_id, stock)
VALUES (1, 10)
ON CONFLICT (item_id) DO UPDATE
SET stock = inventory.stock + EXCLUDED.stock;