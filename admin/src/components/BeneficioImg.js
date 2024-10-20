import React, { useState, useEffect } from 'react';
import imageCompression from 'browser-image-compression';
import Icon from "../elementos/Icons";
import axios from 'axios';

const BeneficioImg = ({ imagem, onImagemChange, beneficioId }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('/midia/imagem.webp'); // Imagem padrão
    const [imageError, setImageError] = useState(false);

    // useEffect(() => {
    //     if (imagem && typeof imagem === 'string' && imagem.trim() !== '') {
    //         setImageUrl(imagem);
    //         setImageError(false);
    //     } else {
    //         setImageUrl('/midia/imagem.webp'); // Imagem padrão se não houver imagem válida
    //     }
    // }, [imagem]);
    useEffect(() => {
        if (beneficioId) {
            setImageUrl(`/midia/imgBeneficios/${beneficioId}.webp`);
            setImageError(false);
        }
    }, [beneficioId]);

    const handleImageError = () => {
        console.error('Erro ao carregar imagem:', imageUrl);
        setImageError(true);
        setImageUrl('/midia/imagem.webp'); // Imagem de fallback
    };

    // const handleImagemChange = async (e) => {
    //     if (!beneficioId) {
    //         console.error("ID do benefício não está definido.");
    //         return;
    //     }

    //     const file = e.target.files[0];
    //     if (file) {
    //         setIsLoading(true);
    //         try {
    //             const options = {
    //                 maxSizeMB: 0.5,
    //                 maxWidthOrHeight: 1024,
    //                 useWebWorker: true,
    //             };
    //             const compressedFile = await imageCompression(file, options);

    //             const formData = new FormData();
    //             formData.append('image', compressedFile);

    //             const response = await axios.put(`/api/benefits/${beneficioId}/image`, formData, {
    //                 headers: {
    //                     'Content-Type': 'multipart/form-data',
    //                 },
    //             });

    //             if (response.data && response.data.imageUrl) {
    //                 setImageUrl(response.data.imageUrl);
    //                 onImagemChange(response.data.imageUrl);
    //                 setImageError(false);
    //             } else {
    //                 throw new Error('Resposta inválida do servidor');
    //             }
    //         } catch (error) {
    //             console.error("Erro ao enviar a imagem ao servidor:", error);
    //             setImageError(true);
    //             // Manter a imagem atual em caso de erro
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     }
    // };

    const handleImagemChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Aqui pode implementar a lógica para enviar o arquivo para o servidor
            // Por enquanto, vamos apenas simular uma mudança local
            const newImageUrl = URL.createObjectURL(file);
            setImageUrl(newImageUrl);
            onImagemChange(newImageUrl);
            setImageError(false);
        }
    };

    return (
        <div className="w-full md:w-1/2 md:h-full bg-white rounded-[32px] self-stretch grow relative">
            <img
                src={imageUrl}
                alt="Imagem do Benefício"
                className="w-full h-full object-cover rounded-[32px]"
                onError={handleImageError}
            />
            {imageError && <div className="absolute top-0 left-0 bg-red-500 text-white p-2 rounded">Erro ao carregar imagem</div>}
            {/* <label 
                htmlFor="upload-image" 
                className="bt-marrom absolute bottom-4 right-4 flex justify-center items-center cursor-pointer"
            >
                <div className="h-8 w-8">
                    <Icon name="baixar" />
                </div>
                Mudar imagem
            </label> */}
            <input 
                id="upload-image" 
                type="file" 
                accept="image/*" 
                onChange={handleImagemChange} 
                className="hidden"
            />
        </div>
    );
};

export default BeneficioImg;