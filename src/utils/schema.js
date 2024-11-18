import * as Yup from 'yup';


const TransactionsSchema = Yup.object().shape({
	ID: Yup.number()
	  .integer('ID debe ser un número entero.')
	  .positive('ID debe ser un número positivo.')
	  .nullable(), // Permitimos nulo para manejar valores generados automáticamente
	Date: Yup.string()
	  .required('La fecha es obligatoria.')
	  .matches(
		/^\d{4}-\d{2}-\d{2}$/,
		'La fecha debe estar en formato YYYY-MM-DD.'
	  ),
	Period: Yup.string()
	  .transform((value) => {
		if (/^\d{4}-\d{2}$/.test(value)) {
		  return `${value}-01`; // Agrega el día 01 si está en formato YYYY-MM
		}
		return value;
	  })
	  .required('El período es obligatorio.')
	  .matches(
		/^\d{4}-\d{2}-01$/,
		'El período debe estar en formato YYYY-MM-01.'
	  ),
	Amount: Yup.number()
	  .integer('El monto debe ser un número entero.')
	  .required('El monto es obligatorio.'),
	Category: Yup.number()
	  .integer('La categoría debe ser un número entero.')
	  .required('La categoría es obligatoria.'),
	Details: Yup.number()
	  .integer('Los detalles deben ser un número entero.')
	  .nullable(), // Permitimos nulo ya que no es obligatorio
	Type: Yup.string()
	  .required('El tipo es obligatorio.')
	  .matches(
		/^[A-Z]{3}$/,
		'El tipo debe ser exactamente 3 letras mayúsculas.'
	  ),
	Account: Yup.string()
	  .required('La cuenta es obligatoria.')
	  .matches(
		/^[A-Z]{2,4}$/,
		'La cuenta debe tener entre 2 y 4 letras mayúsculas.'
	  ),
	Entity: Yup.number()
	  .integer('La entidad debe ser un número entero.')
	  .nullable(), // Permitimos nulo ya que no es obligatorio
	ExtraData: Yup.string()
	  .max(150, 'Los datos adicionales no pueden superar los 150 caracteres.')
	  .nullable(), // Permitimos nulo ya que no es obligatorio
  });
  
export const NewTransactionSchema = Yup.object().shape({
	Date: Yup.string()
	  .required('La fecha es obligatoria.')
	  .matches(
		/^\d{4}-\d{2}-\d{2}$/,
		'La fecha debe estar en formato YYYY-MM-DD.'
	  ),
	Period: Yup.string()
	  .transform((value) => {
		if (/^\d{4}-\d{2}$/.test(value)) {
		  return `${value}-01`; // Agrega el día 01 si está en formato YYYY-MM
		}
		return value;
	  })
	  .required('El período es obligatorio.')
	  .matches(
		/^\d{4}-\d{2}-01$/,
		'El período debe estar en formato YYYY-MM-01.'
	  ),
	  Amount: Yup.string()
	  .matches(/^-?[\d]+\.[\d]{2}$/)
	  ,
	Category: Yup.string()
	  .required('La categoría es obligatoria.'),
	Type: Yup.string()
	  .required('El tipo es obligatorio.')
	  .matches(
		/^[A-Z]{3}$/,
		'El tipo debe ser exactamente 3 letras mayúsculas.'
	  ),
	Account: Yup.string()
	  .required('La cuenta es obligatoria.')
	  .matches(
		/^[A-Z]{2,4}$/,
		'La cuenta debe tener entre 2 y 4 letras mayúsculas.'
	  ),
	Entity: Yup.string().nullable(),
	ExtraData: Yup.string('extr')
	  .max(150, 'Los datos adicionales no pueden superar los 150 caracteres.')
	  .nullable(), // Permitimos nulo ya que no es obligatorio
  });