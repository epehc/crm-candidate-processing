import {v4 as uuidv4} from 'uuid';

export interface Candidato {
    candidato_id: string;
    timestamp: string;
    nombre: string;
    puesto_aplicado: string;
    como_se_entero: string;
    genero: string;
    telefono_whatsapp: string;
    telefono: string;
    correo: string;
    aspiracion_salarial: string;
    comentarios?: string;
}

export interface InformacionPersonal {
    candidato_id: string;
    dpi: string;
    fecha_nacimiento: string;
    edad: string;
    nacionalidad: string;
    estado_civil: string;
    personas_dependientes: string;
    religion: string;
    software: string;
    partido_politico: string;
    sindicato: string;
    adjetivos: string;
    impedimento_fisico: string;
    enfermedad: string;
    nivel_estudios: string;
    estudios_adicionales: string;
    idiomas: string;
}

export interface Residencia {
    candidato_id: string;
    vive_con: string;
    calle: string;
    zona: string;
    municipio: string;
    departamento: string;
    pais_de_residencia: string;
}

export interface Vicios{
    candidato_id: string;
    fuma: string;
    alcohol: string;
    alcohol_frecuencia: string;
    drogas: string;
    tatuajes: string;
}

export interface Mobilidad{
    candidato_id: string;
    licencia: string;
    licencia_tipo: string;
    licencia_fecha_expiracion: string;
    tiempo_conduciendo: string;
    vehiculo: string;
    vehiculo_tipo: string;
    vehiculo_modelo: string;
    viaje_interior: string;
    viaje_exterior: string;
}

export interface Contacto{
    id: string;
    candidato_id: string;
    parentezco?: string;
    nombre: string;
    trabajo: string;
    telefono: string;
}

export interface Estudio{
    id: string;
    candidato_id: string;
    institucion: string;
    titulo: string;
    grado: string;
}

export interface ExperienciaLaboral{
    id: string;
    candidato_id: string;
    empresa: string;
    puesto: string;
    fecha_inicio: string;
    fecha_fin: string;
    telefono_empresa: string;
    direccion_empresa: string;
    jefe_nombre: string;
    jefe_telefono: string;
    salario: string;
    motivo_salida: string;
    responsabilidades: string;
}

export const createNewCandidate = (data:any): Candidato => {
    return {
        candidato_id: uuidv4(),
        timestamp: data.timestamp,
        nombre: data.nombre,
        puesto_aplicado: data.puesto_aplicado,
        como_se_entero: data.como_se_entero,
        genero: data.genero,
        telefono: data.telefono,
        telefono_whatsapp: data.telefono_whatsapp,
        correo: data.correo,
        aspiracion_salarial: data.aspiracion_salarial,
        comentarios: " "
    }
}

export const createInformacionPersonal = (candidato_id:string, data:any): InformacionPersonal => {
    return {
        candidato_id,
        dpi: data.dpi,
        fecha_nacimiento: data.fecha_nacimiento,
        edad: data.edad,
        nacionalidad: data.nacionalidad,
        estado_civil: data.estado_civil,
        personas_dependientes: data.personas_dependientes,
        religion: data.religion,
        software: data.software,
        partido_politico: data.partido_politico,
        sindicato: data.sindicato,
        adjetivos: data.adjetivos,
        impedimento_fisico: data.impedimento_fisico,
        enfermedad: data.enfermedad,
        nivel_estudios: data.nivel_estudios,
        estudios_adicionales: data.estudios_adicionales,
        idiomas: data.idiomas
    }
}

export const createResidencia = (candidato_id:string, data:any): Residencia => {
    return {
        candidato_id,
        vive_con: data.vive_con,
        calle: data.calle,
        zona: data.zona,
        municipio: data.municipio,
        departamento: data.departamento,
        pais_de_residencia: data.pais_de_residencia
    }
}

export const createVicios = (candidato_id:string, data:any): Vicios => {
    return {
        candidato_id,
        fuma: data.fuma,
        alcohol: data.alcohol,
        alcohol_frecuencia: data.alcohol_frecuencia,
        drogas: data.drogas,
        tatuajes: data.tatuajes
    }
}

export const createMobilidad = (candidato_id:string, data:any): Mobilidad => {
    return {
        candidato_id,
        licencia: data.licencia,
        licencia_tipo: data.licencia_tipo,
        licencia_fecha_expiracion: data.licencia_fecha_expiracion,
        tiempo_conduciendo: data.tiempo_conduciendo,
        vehiculo: data.vehiculo,
        vehiculo_tipo: data.vehiculo_tipo,
        vehiculo_modelo: data.vehiculo_modelo,
        viaje_interior: data.viaje_interior,
        viaje_exterior: data.viaje_exterior
    }
}

export const createContactos = (candidato_id:string, data:any): Contacto[] => {
    const contactos: Contacto[] = [];

    for (let i = 1; i <=6; i++) {
        const parentezco = data[`contacto_parentezco${i}`]? data[`contacto_parentezco${i}`] : '';
        const nombre = data[`contacto_nombre${i}`];
        const trabajo = data[`contacto_trabajo${i}`];
        const telefono = data[`contacto_telefono${i}`];

        if (
            parentezco && parentezco !== '-' &&
            nombre && nombre !== '-' &&
            trabajo && trabajo !== '-' &&
            telefono && telefono !== '-'
        ) {
            contactos.push({
                id: uuidv4(),
                candidato_id,
                parentezco,
                nombre,
                trabajo,
                telefono
            });
        }
    }

    return contactos;
}

export const createEstudios = (candidato_id:string, data:any): Estudio[] => {
    const estudios: Estudio[] = [];

    const nivelEstudios = [
        {nivel: 'doctorado', institucion: 'institucion_doctorado', titulo: 'titulo_doctorado', grado: 'grado_doctorado'},
        {nivel: 'maestria', institucion: 'institucion_maestria', titulo: 'titulo_maestria', grado: 'grado_maestria'},
        {nivel: 'licenciatura', institucion: 'institucion_licenciatura', titulo: 'titulo_licenciatura', grado: 'grado_licenciatura'},
        {nivel: 'tecnico', institucion: 'institucion_tecnico', titulo: 'titulo_tecnico', grado: 'grado_tecnico'},
        {nivel: 'diversificado', institucion: 'institucion_diversificado', titulo: 'titulo_diversificado', grado: 'grado_diversificado'},
    ]

    nivelEstudios.forEach(nivel => {
        const institucion = data[nivel.institucion];
        const titulo = data[nivel.titulo];
        const grado = data[nivel.grado];

        if (
            institucion && institucion !== '-' &&
            titulo && titulo !== '-' &&
            grado && grado !== '-'
        ) {
            estudios.push({
                id: uuidv4(),
                candidato_id,
                institucion,
                titulo,
                grado
            });
        }
    })
    return estudios
}

export const createExperienciaLaboral = (candidato_id:string, data:any): ExperienciaLaboral[] => {
    const trabajos: ExperienciaLaboral[] = [];

    for(let i = 1; i <=4; i++) {
        const empresa = data[`empresa${i}`];
        const puesto = data[`puesto${i}`];
        const fecha_inicio = data[`fecha_inicio${i}`];
        const fecha_fin = data[`fecha_fin${i}`];
        const telefono_empresa = data[`telefono_empresa${i}`];
        const direccion_empresa = data[`direccion_empresa${i}`];
        const jefe_nombre = data[`jefe_nombre${i}`];
        const jefe_telefono = data[`jefe_telefono${i}`];
        const salario = data[`salario${i}`];
        const motivo_salida = data[`motivo_salida${i}`];
        const responsabilidades = data[`responsabilidades${i}`];

        if (
            empresa && empresa !== '-' &&
            puesto && puesto !== '-' &&
            fecha_inicio && fecha_inicio !== '-' &&
            fecha_fin && fecha_fin !== '-' &&
            telefono_empresa && telefono_empresa !== '-' &&
            direccion_empresa && direccion_empresa !== '-' &&
            jefe_nombre && jefe_nombre !== '-' &&
            jefe_telefono && jefe_telefono !== '-' &&
            salario && salario !== '-' &&
            motivo_salida && motivo_salida !== '-' &&
            responsabilidades && responsabilidades !== '-'
        ) {
            trabajos.push({
                id: uuidv4(),
                candidato_id,
                empresa,
                puesto,
                fecha_inicio,
                fecha_fin,
                telefono_empresa,
                direccion_empresa,
                jefe_nombre,
                jefe_telefono,
                salario,
                motivo_salida,
                responsabilidades
            });
        }
    }

    return trabajos
}
