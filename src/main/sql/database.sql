------------
-- TABLES --
------------

CREATE TABLE "accounts" (
	"id"	TEXT NOT NULL UNIQUE,
	"name"	TEXT NOT NULL UNIQUE,
	"description"	TEXT,
	"starting_balance"	INTEGER NOT NULL DEFAULT 0,
	PRIMARY KEY("ID")
);

CREATE TABLE "categories" (
	"id"	INTEGER NOT NULL UNIQUE,
	"name"	TEXT NOT NULL UNIQUE,
	"description"	TEXT,
	"parent_id"	INTEGER,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("parent_id") REFERENCES "categories"("id")
);


CREATE TABLE "types" (
	"id"	TEXT NOT NULL UNIQUE,
	"name"	TEXT NOT NULL UNIQUE,
	"description"	TEXT,
	"internal"	NUMERIC NOT NULL DEFAULT 1,
	PRIMARY KEY("id")
);

CREATE TABLE "transactions" (
	"id"		INTEGER NOT NULL UNIQUE,
	"date"		TEXT NOT NULL
				CHECK ("date" LIKE '____-__-__' AND 
				substr("date", 1, 4) BETWEEN '0000' AND '9999' AND 
				substr("date", 6, 2) BETWEEN '01' AND '12' AND 
				substr("date", 9, 2) BETWEEN '01' AND '31'), -- YYYY-MM-DD
	"period"	TEXT NOT NULL
				CHECK ("period" LIKE '____-__-01' AND 
				substr("period", 1, 4) BETWEEN '0000' AND '9999' AND 
				substr("period", 6, 2) BETWEEN '01' AND '12'), -- YYYY-MM-01 (Month)
	"amount"	INTEGER NOT NULL DEFAULT 0,
	"category"	INTEGER NOT NULL,	
	"type"		TEXT NOT NULL 
				CHECK (LENGTH("type") = 3 AND "type" = UPPER("type")), -- 3 CAPITAL LETTERS
	"account"	TEXT NOT NULL 
				CHECK (LENGTH("account") BETWEEN 2 AND 4 AND "account" = UPPER("account")), -- 2 to 4 CAPITAL LETTERS

	"creation_time"  	TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%S:%s', 'now', 'localtime') ),
    "modification_time" TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%S:%s', 'now', 'localtime') ),

	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("account") REFERENCES "accounts"("id"),
	FOREIGN KEY("category") REFERENCES "categories"("id"),
	FOREIGN KEY("type") REFERENCES "types"("id")
);

------------------
-- INITIAL DATA --
------------------
INSERT INTO accounts (id, name) VALUES 
	('CASH', 'Efectivo'),
	('BANK', 'Cuenta Bancaria'),
	('APP',  'Aplicación Móvil');

INSERT INTO types (id, name, internal) VALUES 
	('FIJ', 'Fijo', 0),
	('ORD', 'Ordinario', 0),
	('EXT', 'Extraordinario', 0),
	('TRF', 'Transferencia', 1);

INSERT INTO categories (name) VALUES 
	('Otro'),
	('Desconocido'),
	('Salario'),
	('Financiero'),
	('Suscripciones'),
	('Transporte'),
	('Mercadería'),
	('Servicios'),
	('Bienes'),
	('Salud'),
	('Ocio'),
	('Automóvil');

INSERT INTO categories (parent_id, name)
VALUES
	((SELECT id FROM categories WHERE name = 'Automóvil'), 'Seguro'),
	((SELECT id FROM categories WHERE name = 'Automóvil'), 'Mantenimiento'),
	((SELECT id FROM categories WHERE name = 'Automóvil'), 'Reparación'),
	((SELECT id FROM categories WHERE name = 'Servicios'), 'Internet'),
	((SELECT id FROM categories WHERE name = 'Servicios'), 'Celular'),
	((SELECT id FROM categories WHERE name = 'Transporte'), 'Combustible'),
	((SELECT id FROM categories WHERE name = 'Transporte'), 'Público');


-----------
-- VIEWS --
-----------

-- Shoews transaction data and adds names for category, account and type
CREATE VIEW "transactions_view"
AS
SELECT 
	trx.id AS id,
	"date",
	"period",
	"amount",
	"category",
	c.name AS category_name,
	"type",
	t.name AS type_name,
	"account",
	a.name AS account_name,
	"creation_time",
	"modification_time"
FROM transactions trx 
INNER JOIN categories c ON c.id = trx.category
INNER JOIN accounts a ON a.id = trx.account
INNER JOIN types t ON t.id = trx.type
WHERE
	t.internal = 0;

CREATE VIEW "income_statement" (
	period,
	c_fij, c_ord, c_ext, c_total,
	d_fij, d_ord, d_ext, d_total,
	result
)
AS
SELECT
	period,
	(SELECT IFNULL(SUM(amount), 0) FROM transactions WHERE amount > 0 AND type = 'FIJ' AND period = trx.period) AS C_FIJ,
	(SELECT IFNULL(SUM(amount), 0) FROM transactions WHERE amount > 0 AND type = 'ORD' AND period = trx.period) AS C_ORD,
	(SELECT IFNULL(SUM(amount), 0) FROM transactions WHERE amount > 0 AND type = 'EXT' AND period = trx.period) AS C_EXT,
	(SELECT IFNULL(SUM(amount), 0) FROM transactions WHERE amount > 0 AND period = trx.period) AS C_total,	
	(SELECT IFNULL(SUM(amount), 0) FROM transactions WHERE amount < 0 AND type = 'FIJ' AND period = trx.period) AS D_FIJ,
	(SELECT IFNULL(SUM(amount), 0) FROM transactions WHERE amount < 0 AND type = 'ORD' AND period = trx.period) AS D_ORD,
	(SELECT IFNULL(SUM(amount), 0) FROM transactions WHERE amount < 0 AND type = 'EXT' AND period = trx.period ) AS D_EXT,
	(SELECT IFNULL(SUM(amount), 0) FROM transactions WHERE amount < 0 AND period = trx.period ) AS D_Total,
	(SELECT IFNULL(SUM(amount), 0) FROM transactions WHERE period = trx.period AND period = trx.period ) AS Result
FROM transactions trx
GROUP BY
	period;


CREATE VIEW "linked_fields"
AS
SELECT 
	"table" AS table_name, 
	"from" AS field_name,
	ifnull((
		SELECT 1 
		FROM pragma_table_info("table") 
		WHERE "name" = 'parent_id'),0
	) AS is_hierarchical,
	
	ifnull((
		SELECT 1 
		FROM pragma_table_info("table") 
		WHERE "name" = 'internal'),0)
	AS has_internal_records,
	
	(SELECT "notnull"
	FROM pragma_table_info('transactions') 
	WHERE "name" = "from")
	
	AS is_required
	
FROM 
	pragma_foreign_key_list('transactions');


CREATE VIEW category_items
AS
WITH RECURSIVE cte_hierarchy(id, parent_id, name, description, depth, path) AS (
    -- Caso base: Nodos raíz
    SELECT id, parent_id, name, description, 0 AS depth, name AS path
    FROM categories
    WHERE parent_id IS NULL
    UNION ALL
    -- Caso recursivo: Nodos con un padre
    SELECT h.id, h.parent_id, h.name, h.description, cte.depth + 1, printf('%s/%s', cte.path, h.name) AS path
    FROM categories h
    INNER JOIN cte_hierarchy cte ON h.parent_id = cte.id
)
SELECT id, parent_id, name, description, depth, path
FROM cte_hierarchy
ORDER BY path;

CREATE VIEW type_items
AS
SELECT "id", "name", "description"
FROM types
WHERE internal = 0;

CREATE VIEW account_items
AS
SELECT "id", "name", "description"
FROM accounts;

CREATE VIEW period_items
AS
SELECT DISTINCT "period"
FROM transactions;

--------------
-- TRIGGERS --
--------------
CREATE TRIGGER trg_update_modification_time
        BEFORE UPDATE
            ON transactions
BEGIN
    UPDATE transactions
       SET modification_time = strftime('%Y-%m-%d %H:%M:%S:%s', 'now', 'localtime') 
     WHERE id = old.id;
END;