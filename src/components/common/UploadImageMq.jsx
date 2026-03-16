import { Upload, message } from 'antd';
import { uploadImageToCloudinary } from '@/utilities/useImageUploader.js';


// La función de validación tampoco necesita cambios.
const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('¡Solo puedes subir archivos JPG/PNG!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) { // las imagenes solo pueden ser de un maximo de 2MB
        message.error('¡La imagen debe ser menor a 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

// Acepta `value` y `onChange` para integrarse con Antd Form.
const UploadImagenMq = ({ value, onChange }) => {
    const [loading, setLoading] = useState(false);

    //Almecenamos la imagen
    const imageUrl = value; 

    const handleCustomRequest = async ({ file, onSuccess, onError }) => {
        setLoading(true);

        try{
            const url = await uploadImageToCloudinary(file);
            onSuccess(url, file);
            onChange?.(url);
        }catch(error){
            onError(error);
        }finally{
            setLoading(false);
        }
    };

    const uploadButton = (
        <div>
            {loading ? (
                <span className="material-symbols-outlined spinning">sync</span>
            ) : (
                <span className="material-symbols-outlined">add</span>
            )}
            <div style={{ marginTop: 8 }}>Subir</div>
        </div>
    );

    return (
        <Upload
            name="imagen"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            customRequest={handleCustomRequest}
        >
            {/* 5. Muestra la imagen usando la URL (el valor actual del campo del formulario) */}
            {imageUrl ? (
                // Si la URL es una cadena, se muestra la imagen
                <img src={imageUrl} alt="Vista previa" style={{ width: '100%' }} />
            ) : (
                uploadButton
            )}
        </Upload>
    );
};

export default UploadImagenMq;