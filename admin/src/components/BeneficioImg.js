import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import imageCompression from 'browser-image-compression';
import Icon from "../elementos/Icons";
import axios from 'axios';

const BeneficioImg = ({ imagem, onImagemChange, beneficioId }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('/midia/imagem.webp'); // Imagem padrão
    const [imageError, setImageError] = useState(false);

    
    useEffect(() => {
        if (beneficioId) {
            setImageUrl(`https://opuramarmores.com/benef-img/${beneficioId}.webp`);
            setImageError(false);
        }
    }, [beneficioId]);

    const handleImageError = () => {
        console.error('Erro ao carregar imagem:', imageUrl);
        setImageError(true);
        setImageUrl('/midia/imagem.webp'); // Imagem de fallback
    };


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
            <Image
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