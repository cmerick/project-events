import { Search, MoreHorizontal, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react"
export function AttendeeList() {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-3 items-center">
                <h1 className="text-2xl font-bold">Participantes</h1>
                <div className="flex items-center gap-3 w-72 px-3 py-1.5 rounded-lg border border-white/10 ">
                    <Search className="size-4 text-emerald-300" />
                    <input type="text" placeholder="Buscar participantes..." className="text-sm bg-transparent form-input border-0 focus:ring-0 focus:ring-offset-0 flex-1  p-0" />
                </div>
            </div>
            <div className="border border-white/10 rounded-lg">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/10">
                            <th style={{ width: 48 }} className="py-3 px-4 text-sm font-semibold text-left">
                                <input type="checkbox" className="size-4 bg-black/20 border border-white/10 rounded p-1.5 form-checkbox  focus:ring-0 focus:ring-offset-0 text-orange-400" />
                            </th>
                            <th className="py-3 px-4 text-sm font-semibold text-left">
                                Código
                            </th>
                            <th className="py-3 px-4 text-sm font-semibold text-left">
                                Participantes
                            </th>
                            <th className="py-3 px-4 text-sm font-semibold text-left">
                                Data de inscrição
                            </th>
                            <th className="py-3 px-4 text-sm font-semibold text-left">
                                Data do check-in
                            </th>
                            <th style={{ width: 64 }} className="py-3 px-4 text-sm font-semibold text-left"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: 8 }).map((_, index) => {
                            return (
                                <tr key={index} className="border-b border-white/10 hover:bg-white/5">
                                    <td className="py-3 px-4 text-sm text-zinc-300">
                                        <input type="checkbox" className="size-4 bg-black/20 border border-white/10 rounded p-1.5 form-checkbox focus:ring-0 focus:ring-offset-0 text-orange-400 " />
                                    </td>
                                    <td className="py-3 px-4 text-sm text-zinc-300">1234</td>
                                    <td className="py-3 px-4 text-sm text-zinc-300">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-sm font-semibold text-white">Erick Castilho Mestre</span>
                                            <span className="text-sm text-zinc-300">erickcastilhomestre@hotmail.com</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-sm text-zinc-300">1 month ago</td>
                                    <td className="py-3 px-4 text-sm text-zinc-300">1 month ago</td>
                                    <td className="py-3 px-4 text-sm text-zinc-300">
                                        <button className="bg-black/20 border border-white/10 rounded-md p-1.5">
                                            <MoreHorizontal className="size-4" />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                    <tfoot>
                        <tr className="">
                            <td colSpan={3} className="py-3 px-4 text-sm text-zinc-300">Mostrando 10 de 220 itens</td>
                            <td colSpan={3} className="py-3 px-4 text-sm text-zinc-300 text-right">
                                <div className="gap-8 inline-flex items-center">
                                    <span>Página 1 de 22</span>
                                    <div className="flex gap-1.5">
                                        <button className="bg-white/10 border border-white/10 rounded-lg p-[6px]">
                                            <ChevronsLeft className="size-4" />
                                        </button>
                                        <button className="bg-white/10 border border-white/10 rounded-lg p-[6px]">
                                            <ChevronLeft className="size-4" />
                                        </button>
                                        <button className="bg-white/10 border border-white/10 rounded-lg p-[6px]">
                                            <ChevronRight className="size-4" />
                                        </button>
                                        <button className="bg-white/10 border border-white/10 rounded-lg p-[6px]">
                                            <ChevronsRight className="size-4" />
                                        </button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}