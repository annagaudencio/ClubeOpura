import { deleteUser } from "/services/users";
import { useRouter } from 'next/router';

export default function UserApagar({ userId }) {
    const router = useRouter();

    // Função para deletar o registro
    const handleDelete = async () => {
        if (window.confirm("Tem certeza que deseja excluir este parceiro?")) {
            try {
                await deleteUser(userId);
                alert("Parceiro excluído com sucesso!");
                router.push('/parceiros');
            } catch (error) {
                console.error('Erro ao excluir parceiro:', error);
                alert("Erro ao excluir parceiro.");
            }
        }
    };

    return (
        <div className="text-[#ff0000]">
            <p className="animate-pulse w-full text-center pt-2">Cuidado aqui, ok?!</p>
            <button onClick={handleDelete} className="bt-perigo w-full">Excluir Parceiro</button>
        </div>
    )
}