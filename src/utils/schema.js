const { object, number, date, string } = require("yup");



export const NewTransactionSchema = object({

})


const IdSchema = number().positive().integer().required()

const TypeIdSchema = string().matches(/[A-Z]{3}/, "deben ser 3 letras mayúsuculas")
const AccountIdSchema = string().matches(/[A-Z]{2,4}/, "deben ser de 2 a 4 letras mayúsculas")
const NameSchema = string().max(15).required()
const DescriptionSchema = string().max(150)
const CurrencySchema = number().required().default(0)

/*
	"ID"	TEXT NOT NULL UNIQUE,
	"Name"	TEXT NOT NULL UNIQUE,
	"Description"	TEXT,
	"StartingBalance"	INTEGER NOT NULL DEFAULT 0,
*/
export const AccountSchema = object({
    id: AccountIdSchema,
    name: NameSchema,
    description: DescriptionSchema,
    startingBalance: CurrencySchema
})

/*
	"ID"	INTEGER NOT NULL UNIQUE,
	"Name"	TEXT NOT NULL UNIQUE,
	"Description"	TEXT,
*/
export const CategorySchema = object({
    id: IdSchema,
    name: NameSchema,
    description: DescriptionSchema
})

/*
	"ID"	INTEGER NOT NULL UNIQUE,
	"Name"	TEXT NOT NULL UNIQUE,
	"Description"	TEXT,
*/
export const EntitySchema = CategorySchema

/*
	"ID"	INTEGER NOT NULL UNIQUE,
	"Category"	INTEGER NOT NULL,
	"Name"	TEXT NOT NULL,
*/
export const DetailSchema = object({
    id: IdSchema,
    category: IdSchema,
    name: NameSchema
})

/*
	"ID"	TEXT NOT NULL UNIQUE,
	"Name"	TEXT NOT NULL UNIQUE,
	"Description"	TEXT,
	"Internal"	NUMERIC NOT NULL DEFAULT 1,
*/
export const TypeSchema = object({
    id: TypeIdSchema,
    name: NameSchema,
    description: DescriptionSchema, 
    internal: number().integer().min(0).max(1).default(1)
})

/*
	"ID"		INTEGER NOT NULL UNIQUE,
	"Date"		TEXT NOT NULL, 				-- YYYY-MM-DD
	"Period"	TEXT NOT NULL,				-- YYYY-MM-01
	"Amount"	INTEGER NOT NULL DEFAULT 0,	-- 2 decimal points added as format when showed, it stores real amount * 10
	"Category"	INTEGER NOT NULL,
	"Details"	INTEGER,
	"Type"		TEXT NOT NULL,		        -- 3 ASCII Capital letters
	"Account"	TEXT NOT NULL,              -- 2 to 4 ASCII Captial letters
	"Entity"	INTEGER,
	"ExtraData"	TEXT,			            -- 150 Characters
*/
export const TransactionDataSchema = object({
    date: date().required(),
    period: date().required(),
    amount: CurrencySchema,
    category: IdSchema,
    details: number().integer().positive(),
    type: TypeIdSchema,
    account: AccountIdSchema,
    entity: IdSchema,
    extradata: string().max(150, "máximo 150 caracteres")
})

export const TransactionSchema = TransactionDataSchema.shape({
    id: IdSchema
})


