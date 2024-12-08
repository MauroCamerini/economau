import * as Yup from 'yup'

export const TransactionFormSchema = Yup.object().shape({
    date: Yup.string()
        .required('La fecha es obligatoria.')
        .matches(
            /^\d{4}-\d{2}-\d{2}$/,
            'La fecha debe estar en formato YYYY-MM-DD.'
        ),
    period: Yup.string()
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
    amount: Yup.string()
        .matches(
            /^-?[\d]+\.[\d]{2}$/,
            'El monto debe contener exactamente 2 (dos) decimales.'
        ),
    category: Yup.number()
        .required('La categoría es obligatoria.')
        .integer('Categoría inválida se debe especificar un ID entero')
        .min(1, 'Categoría inválida se debe especificar un ID entero'),
    type: Yup.string()
        .required('El tipo es obligatorio.')
        .matches(
        /^[A-Z]{3}$/,
        'El tipo debe contener exactamente 3 letras mayúsculas.'
        ),
    account: Yup.string()
        .required('La cuenta es obligatoria.')
        .matches(
            /^[A-Z]{2,4}$/,
            'La cuenta debe tener entre 2 y 4 letras mayúsculas.'
        ),
})