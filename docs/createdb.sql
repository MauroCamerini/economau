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

CREATE TABLE "Entities" (
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
	"Details"	INTEGER,
	"Type"		TEXT NOT NULL,		-- 3 ASCII Capital letters
	"Account"	TEXT NOT NULL,  -- 2 to 4 ASCII Captial letters
	"Entity"	INTEGER,
	"ExtraData"	TEXT,			-- 150 Characters
	PRIMARY KEY("ID" AUTOINCREMENT),
	FOREIGN KEY("Account") REFERENCES "Accounts"("ID"),
	FOREIGN KEY("Category") REFERENCES "Categories"("ID"),
	FOREIGN KEY("Details") REFERENCES "Details"("ID"),
	FOREIGN KEY("Entity") REFERENCES "Entities"("ID"),
	FOREIGN KEY("Type") REFERENCES "Types"("ID")
)

INSERT into Types (ID, Name, Internal) VALUES ("FIJ", "Fijo", 0);
INSERT into Types (ID, Name, Internal) VALUES ("ORD", "Ordinario", 0);
INSERT into Types (ID, Name, Internal) VALUES ("EXT", "Extraordinario", 0);
INSERT into Types (ID, Name, Internal) VALUES ("TRF", "Transferencia", 1);

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
ParentID
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

INSERT INTO Entities (name) VALUES ("Supermercado");
INSERT INTO Entities (name) VALUES ("Verdulería");
INSERT INTO Entities (name) VALUES ("Carnicería");
INSERT INTO Entities (name) VALUES ("Dietética");
INSERT INTO Entities (name) VALUES ("ProvinciaNet");
INSERT INTO Entities (name) VALUES ("Banco Provincia");