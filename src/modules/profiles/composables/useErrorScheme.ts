// Importaciones de repositorio de reglas
import { customRules } from '@/shared/helpers/custom-rules/customRules.js';

//* REPOSITORIO DE ESQUEMAS
export const errorScheme = {
    'name_profile': (value) => {
        return [
            customRules.notEmpty(value),
            customRules.isString(value),
            customRules.maxLength(value, 50),
        ]
    },
}