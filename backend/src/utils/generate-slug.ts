export function generateSlug(texto: string): string {
    return texto
      .normalize('NFD') // Separa os acentos dos caracteres
      .replace(/[\u0300-\u036f]/g, '') // Remove os acentos
      .replace(/[^a-zA-Z0-9 ]/g, '') // Remove os símbolos
      .trim() // Remove espaços do início e do fim
      .replace(/\s+/g, '-') // Substitui espaços por hífens
      .toLowerCase(); // Converte para minúsculas
  }