// src/lib/api.ts
export const API_BASE = process.env.NEXT_PUBLIC_API_URL; // ou o host do seu backend

export async function getCarrinho() {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Usuário não logado');

    const res = await fetch(`${API_BASE}/carrinho`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error('Erro ao buscar carrinho');
    return res.json();
}


export async function adicionarItemCarrinho(produtoId: number, quantidade: number) {
    const res = await fetch(`${API_BASE}/carrinho/adicionar`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ produtoId, quantidade }),
    });
    if (!res.ok) throw new Error("Erro ao adicionar item");
    return res.json();
}

export async function atualizarQuantidadeCarrinho(produtoId: number, quantidade: number) {
    const res = await fetch(`${API_BASE}/carrinho/atualizar`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ produtoId, quantidade }),
    });
    if (!res.ok) throw new Error("Erro ao atualizar item");
    return res.json();
}

export async function removerItemCarrinho(produtoId: number) {
    const res = await fetch(`${API_BASE}/carrinho/remover/${produtoId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    if (!res.ok) throw new Error("Erro ao remover item");
    return res.json();
}

export const getProdutos = async () => {
    const res = await fetch(`${API_BASE}/produtos`); // ou a porta do seu backend
    if (!res.ok) throw new Error("Erro ao buscar produtos");
    return res.json();
};
