CREATE TABLE "Metadata" (
	"TableName"	TEXT,
	"Title"	TEXT NOT NULL,
	"IsHierarchical"	INTEGER DEFAULT 0,
	"HasInternalRecords"	INTEGER DEFAULT 0,
	"TransactionField"	TEXT NOT NULL,
	"IsRequired" INTEGER DEFAULT 0,
	"ShouldCache"	INTEGER DEFAULT 0,
	PRIMARY KEY("TableName")
)

CREATE TABLE "Accounts" (
	"ID"	TEXT NOT NULL UNIQUE,
	"Name"	TEXT NOT NULL UNIQUE,
	"Description"	TEXT,
	"StartingBalance"	INTEGER NOT NULL DEFAULT 0,
	PRIMARY KEY("ID")
)

CREATE TABLE "Categories" (
	"ID"	INTEGER NOT NULL UNIQUE,
	"Name"	TEXT NOT NULL UNIQUE,
	"Description"	TEXT,
	"ParentID"	INTEGER,
	PRIMARY KEY("ID" AUTOINCREMENT),
	FOREIGN KEY("ParentID") REFERENCES "Categories"("ID")
)

CREATE TABLE "Contact" (
	"ID"	INTEGER NOT NULL UNIQUE,
	"Name"	TEXT NOT NULL UNIQUE,
	"Description"	TEXT,
	PRIMARY KEY("ID" AUTOINCREMENT)
)


CREATE TABLE "Types" (
	"ID"	TEXT NOT NULL UNIQUE,
	"Name"	TEXT NOT NULL UNIQUE,
	"Description"	TEXT,
	"Internal"	NUMERIC NOT NULL DEFAULT 1,
	PRIMARY KEY("ID")
)

CREATE TABLE "Transactions" (
	"ID"		INTEGER NOT NULL UNIQUE,
	"Date"		TEXT NOT NULL, 				-- YYYY-MM-DD
	"Period"	TEXT NOT NULL,				-- YYYY-MM-01
	"Amount"	INTEGER NOT NULL DEFAULT 0,	-- stores cent
	"Category"	INTEGER NOT NULL,
	"Type"		TEXT NOT NULL,		-- 3 ASCII Capital letters
	"Account"	TEXT NOT NULL,  -- 2 to 4 ASCII Captial letters
	"Contact"	INTEGER,
	"ExtraData"	TEXT,			-- 150 Characters
	PRIMARY KEY("ID" AUTOINCREMENT),
	FOREIGN KEY("Account") REFERENCES "Accounts"("ID"),
	FOREIGN KEY("Category") REFERENCES "Categories"("ID"),
	FOREIGN KEY("Details") REFERENCES "Details"("ID"),
	FOREIGN KEY("Entity") REFERENCES "Entities"("ID"),
	FOREIGN KEY("Type") REFERENCES "Types"("ID")
)

INSERT INTO Metadata (TableName, Title, TransactionField, ShouldCache, IsRequired) VALUES ("Accounts", "Cuenta", "Account", 1, 1);
INSERT INTO Metadata (TableName, Title, TransactionField, IsHierarchical, HasInternalRecords, ShouldCache, IsRequired) VALUES ("Categories", "Categoría", "Category", 1, 1, 1, 1);
INSERT INTO Metadata (TableName, Title, TransactionField, HasInternalRecords, ShouldCache, IsRequired) VALUES ("Types", "Tipo", "Type", 1, 1, 1);
INSERT INTO Metadata (TableName, Title, TransactionField, ShouldCache, IsRequired) VALUES ("Contacts", "Contacto", "Contact", 1, 1);

INSERT INTO Types (ID, Name, Internal) VALUES ("FIJ", "Fijo", 0);
INSERT INTO Types (ID, Name, Internal) VALUES ("ORD", "Ordinario", 0);
INSERT INTO Types (ID, Name, Internal) VALUES ("EXT", "Extraordinario", 0);
INSERT INTO Types (ID, Name, Internal) VALUES ("TRF", "Transferencia", 1);

INSERT INTO Categories (Name) VALUES ("Financiero");
INSERT INTO Categories (Name) VALUES ("Suscripciones");
INSERT INTO Categories (Name) VALUES ("Transporte");
INSERT INTO Categories (Name) VALUES ("Mercadería");
INSERT INTO Categories (Name) VALUES ("Reintegro");
INSERT INTO Categories (Name) VALUES ("Servicios");
INSERT INTO Categories (Name) VALUES ("Bienes");
INSERT INTO Categories (Name) VALUES ("Salud");
INSERT INTO Categories (Name) VALUES ("Desconocido");
INSERT INTO Categories (Name) VALUES ("Ocio");
INSERT INTO Categories (Name) VALUES ("Auto");
INSERT INTO Categories (Name) VALUES ("Música");
INSERT INTO Categories (Name) VALUES ("Salario");

INSERT INTO Categories (ParentID, Name) VALUES (11, "Seguro");
INSERT INTO Categories (ParentID, Name) VALUES (11, "Mantenimiento");
INSERT INTO Categories (ParentID, Name) VALUES (11, "Reparación");
INSERT INTO Categories (ParentID, Name) VALUES (6, "Internet");
INSERT INTO Categories (ParentID, Name) VALUES (6, "Celular");
INSERT INTO Categories (ParentID, Name) VALUES (3, "Combustible");
INSERT INTO Categories (ParentID, Name) VALUES (3, "Público");

INSERT INTO Accounts (id, name) VALUES ("CASH", "Efectivo");
INSERT INTO Accounts (id, name) VALUES ("BP", "Cuenta Provincia");
INSERT INTO Accounts (id, name) VALUES ("MP", "MercadoPago");

INSERT INTO Contacts (name) VALUES ("Banco Provincia");