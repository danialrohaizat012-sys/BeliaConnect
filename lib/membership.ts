export const isPending=(status:string)=>status==='Baharu'||status==='Menunggu semakan';
export const memberStatusLabel=(status:string)=>isPending(status)?'Menunggu semakan':status==='Aktif'?'Ahli rasmi':status==='Ditolak'?'Permohonan ditolak':status;
export const statusTransitions:Record<string,string[]>={Aktif:['Digantung','Ditamatkan'],Digantung:['Aktif','Ditamatkan']};
