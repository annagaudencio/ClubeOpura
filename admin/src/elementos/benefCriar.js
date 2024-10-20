import InputData from '../elementos/InputData';

const BenefDados = ({ beneficio, setBeneficio, editMode, toggleeditMode }) => {
    const handleChange = (e) => {
      setBeneficio({
        ...beneficio,
        [e.target.name]: e.target.value,
      });
    };

    return (
        <div className="h-full bg-[var(--color-bg-preto)] rounded-[32px] overflow-clip overflow-y-auto p-2 divide-y">
            <div className='flex justify-between items-center pb-4'>
                <h3 className='text-[var(--color-primaria)]'>{beneficio.title || 'Nome do beneficio'}</h3>
                <button onClick={toggleeditMode} className='bt-linha-clara'>{editMode ? 'Salvar' : 'Editar'}</button>
            </div>

            <form>
                <div className='py-8'>
                    <div className="w-full text-[var(--color-primaria)] justify-start items-center inline-flex py-2">
                        <p className="w-32 text-[14px] font-bold">Nome do beneficio:</p>
                        <InputData
                        name="title"
                        value={beneficio.title || ''}
                        onChange={handleChange}
                        editMode={editMode}
                        />
                    </div>
                            
                    <div className="w-full text-[var(--color-primaria)] justify-start items-center inline-flex py-2">
                        <p className="w-32 text-[14px] font-bold">Quantidade de pontos:</p>
                        <InputData
                        name="points"
                        type="number"
                        value={beneficio.points || 0}
                        onChange={handleChange}
                        editMode={editMode}
                        />
                    </div>

                    <div className="w-full text-[var(--color-primaria)] flex flex-col justify-start items-start gap-2 pt-8 gap-2">
                        <p className="w-32 text-[14px] font-bold">Descrição:</p>
                        <InputData
                        name="description"
                        value={beneficio.description || ''}
                        onChange={handleChange}
                        editMode={editMode}
                        />
                    </div>

                </div>
            </form>
        </div>
    );
};

export default BenefDados;