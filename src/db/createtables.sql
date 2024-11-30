CREATE TABLE "Metadata" (
	"TableName"	TEXT,
	"Title"	TEXT NOT NULL,
	"IsHierarchical"	INTEGER DEFAULT 0,
	"HasInternalRecords"	INTEGER DEFAULT 0,
	"TransactionField"	TEXT NOT NULL,
	"IsRequired"	INTEGER DEFAULT 0,
	PRIMARY KEY("TableName")
);

CREATE TABLE "Accounts" (
	"ID"	TEXT NOT NULL UNIQUE,
	"Name"	TEXT NOT NULL UNIQUE,
	"Description"	TEXT,
	"StartingBalance"	INTEGER NOT NULL DEFAULT 0,
	PRIMARY KEY("ID")
);

CREATE TABLE "Categories" (
	"ID"	INTEGER NOT NULL UNIQUE,
	"Name"	TEXT NOT NULL UNIQUE,
	"Description"	TEXT,
	"ParentID"	INTEGER,
	PRIMARY KEY("ID" AUTOINCREMENT),
	FOREIGN KEY("ParentID") REFERENCES "Categories"("ID")
);

CREATE TABLE "Contacts" (
	"ID"	INTEGER NOT NULL UNIQUE,
	"Name"	TEXT NOT NULL UNIQUE,
	"Description"	TEXT,
	PRIMARY KEY("ID" AUTOINCREMENT)
);


CREATE TABLE "Types" (
	"ID"	TEXT NOT NULL UNIQUE,
	"Name"	TEXT NOT NULL UNIQUE,
	"Description"	TEXT,
	"Internal"	NUMERIC NOT NULL DEFAULT 1,
	PRIMARY KEY("ID")
);

CREATE TABLE "Transactions" (
	"ID"		INTEGER NOT NULL UNIQUE,
	"Date"		TEXT NOT NULL,	-- YYYY-MM-DD
	"Period"	TEXT NOT NULL,	-- YYYY-MM-01 (Month)
	"Amount"	INTEGER NOT NULL DEFAULT 0,
	"Category"	INTEGER NOT NULL,	-- 2 to 4 CAPITAL LETTERS
	"Type"		TEXT NOT NULL,		-- 3 CAPITAL LETTERS
	"Account"	TEXT NOT NULL,
	"Contact"	INTEGER,
	"ExtraData"	TEXT,
	PRIMARY KEY("ID" AUTOINCREMENT),
	FOREIGN KEY("Account") REFERENCES "Accounts"("ID"),
	FOREIGN KEY("Category") REFERENCES "Categories"("ID"),
	FOREIGN KEY("Contact") REFERENCES "Contacts"("ID"),
	FOREIGN KEY("Type") REFERENCES "Types"("ID")
);

INSERT INTO Metadata (TableName, Title, TransactionField, IsRequired) VALUES ('Accounts', 'Cuenta', 'Account', 1);
INSERT INTO Metadata (TableName, Title, TransactionField, IsHierarchical, HasInternalRecords, IsRequired) VALUES ('Categories', 'Categoría', 'Category', 1, 1, 1);
INSERT INTO Metadata (TableName, Title, TransactionField, HasInternalRecords, IsRequired) VALUES ('Types', 'Tipo', 'Type', 1, 1);
INSERT INTO Metadata (TableName, Title, TransactionField, IsRequired) VALUES ('Contacts', 'Contacto', 'Contact', 1);

INSERT INTO Accounts (ID, Name) VALUES 
	('CASH', 'Efectivo'),
	('BANK', 'Cuenta Bancaria'),
	('APP',  'Aplicación Móvil');

INSERT INTO Types (ID, Name, Internal) VALUES 
	('FIJ', 'Fijo', 0),
	('ORD', 'Ordinario', 0),
	('EXT', 'Extraordinario', 0),
	('TRF', 'Transferencia', 1);

INSERT INTO Categories (Name) VALUES 
	('Desconocido'),
	('Salario'),
	('Financiero'),
	('Suscripciones'),
	('Transporte'),
	('Mercadería'),
	('Reintegro'),
	('Servicios'),
	('Bienes'),
	('Salud'),
	('Ocio'),
	('Auto');

INSERT INTO Categories (ParentID, Name)
VALUES
	((SELECT ID FROM Categories WHERE Name = 'Auto'), 'Seguro'),
	((SELECT ID FROM Categories WHERE Name = 'Auto'), 'Mantenimiento'),
	((SELECT ID FROM Categories WHERE Name = 'Auto'), 'Reparación'),
	((SELECT ID FROM Categories WHERE Name = 'Servicios'), 'Internet'),
	((SELECT ID FROM Categories WHERE Name = 'Servicios'), 'Celular'),
	((SELECT ID FROM Categories WHERE Name = 'Transporte'), 'Combustible'),
	((SELECT ID FROM Categories WHERE Name = 'Transporte'), 'Público');

INSERT INTO Contacts (Name) VALUES ('Banco Provincia');