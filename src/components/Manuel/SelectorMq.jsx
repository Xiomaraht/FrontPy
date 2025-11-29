import { useEffect, useState } from 'react';
import { obtenerCategorias } from '../../api/categoriesApi'; // Asegúrate de que la ruta sea correcta
import { Select } from 'antd';

// 1. Añadimos `value` y `onChange` a las props.
const SelectorMq = ({ value, onChange }) => {
    const [categorias, setCategorias] = useState([]);
    const [error, setError] = useState(null); // Útil para depuración

    useEffect(() => {
        obtenerCategorias()
            .then((data) => setCategorias(data))
            .catch((fail) => setError(fail.message));
    }, []);

    // Revisión de tu pregunta: ¿Se envía el id?
    // Sí. Al poner `value={item.id}` en el <Option>, estás asegurando que el `id`
    // sea el valor que `onChange` recibirá cuando el usuario seleccione una categoría.
    // ¡Esto ya estaba correcto!

    return (
        <Select
            placeholder="Selecciona una categoría" // Es mejor usar `placeholder` que `defaultValue` en formularios
            style={{ width: '100%' }}
            // 2. Pasamos las props `value` y `onChange` al <Select> de Antd.
            value={value}
            onChange={onChange}
        >
            {categorias.map((item) => {
                return (
                    // La clave `key` es para React, `value` es el valor que se enviará.
                    <Select.Option value={item.id} key={item.id}>
                        {item.name}
                    </Select.Option>
                );
            })}
        </Select>
    );
};

export default SelectorMq;