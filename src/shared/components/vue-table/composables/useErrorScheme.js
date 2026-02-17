// Importaciones de repositorio de reglas
import { customRules } from '@/shared/helpers/custom-rules/customRules.js';

//* REPOSITORIO DE ESQUEMAS
export const errorScheme = {
    'initialDate': (value) => {
        return [
            customRules.notEmpty(value),
        ]
    },
    'finalDate': (value) => {
        return [
            customRules.notEmpty(value),
        ]
    },
}