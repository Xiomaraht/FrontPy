import { Input, InputNumber } from 'antd';

// 1. Añadimos `value` y `onChange` a las props que recibe el componente.
const InputMq = ({ placeholder, tipo, value, onChange }) => {
    
    if (tipo === "text") {
        // 2. Pasamos `value` y `onChange` al componente <Input>.
        return <Input placeholder={placeholder} value={value} onChange={onChange} />;
    }
    
    if (tipo === "textarea") {
        return <Input.TextArea placeholder={placeholder} value={value} onChange={onChange} />;
    }
    
    if (tipo === "prices") {
        return (
            <InputNumber
                placeholder={placeholder}
                style={{ width: '100%' }}
                min={50}
                max={10000000}
                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                // 2. Pasamos `value` y `onChange` al componente <InputNumber>.
                value={value}
                onChange={onChange}
            />
        );
    }
    
    if (tipo === "number") {
        return (
            <InputNumber
                placeholder={placeholder}
                style={{ width: '100%' }}
                min={1}
                max={10000}
                // 2. Pasamos `value` y `onChange` al componente <InputNumber>.
                value={value}
                onChange={onChange}
            />
        );
    }
    
    return null;
};

export default InputMq;