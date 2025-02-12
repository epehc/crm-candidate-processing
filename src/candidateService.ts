import {
    Candidato,
    Contacto,
    createContactos, createEstudios, createExperienciaLaboral,
    createInformacionPersonal,
    createMobilidad,
    createNewCandidate,
    createResidencia,
    createVicios,
    Estudio,
    ExperienciaLaboral,
    InformacionPersonal,
    Mobilidad,
    Residencia,
    Vicios
} from "./candidateModel";
import {queryDb} from "./db";

const insertCandidate = async (candidate: Candidato) => {
    const query = `INSERT INTO candidatos (candidato_id, timestamp, nombre, puesto_aplicado, como_se_entero, genero, telefono, telefono_whatsapp, correo, aspiracion_salarial) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;
    const params = [
        candidate.candidato_id, 
        candidate.timestamp, 
        candidate.nombre, 
        candidate.puesto_aplicado, 
        candidate.como_se_entero, 
        candidate.genero, 
        candidate.telefono, 
        candidate.telefono_whatsapp, 
        candidate.correo, 
        candidate.aspiracion_salarial
    ]
    await queryDb(query, params);
}

const insertInformacionPersonal = async (informacionPersonal: InformacionPersonal) => {
    const query = `INSERT INTO informacion_personal (candidato_id, dpi, fecha_nacimiento, edad, nacionalidad, estado_civil, personas_dependientes, religion, software, partido_politico, sindicato, adjetivos, impedimento_fisico, enfermedad, nivel_estudios, estudios_adicionales, idiomas) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)`;
    const params = [
        informacionPersonal.candidato_id, 
        informacionPersonal.dpi, 
        informacionPersonal.fecha_nacimiento, 
        informacionPersonal.edad, 
        informacionPersonal.nacionalidad, 
        informacionPersonal.estado_civil, 
        informacionPersonal.personas_dependientes, 
        informacionPersonal.religion, 
        informacionPersonal.software, 
        informacionPersonal.partido_politico, 
        informacionPersonal.sindicato, 
        informacionPersonal.adjetivos, 
        informacionPersonal.impedimento_fisico, 
        informacionPersonal.enfermedad, 
        informacionPersonal.nivel_estudios, 
        informacionPersonal.estudios_adicionales, 
        informacionPersonal.idiomas
    ]
    await queryDb(query, params);
}

const insertResidencia = async (residencia: Residencia) => {
    const query = `INSERT INTO residencia (candidato_id, vive_con, calle, zona, municipio, departamento, pais_de_residencia) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
    const params = [
        residencia.candidato_id, 
        residencia.vive_con, 
        residencia.calle, 
        residencia.zona, 
        residencia.municipio, 
        residencia.departamento, 
        residencia.pais_de_residencia
    ]
    await queryDb(query, params);
}

const insertVicios = async (vicios: Vicios) => {
    const query = `INSERT INTO vicios (candidato_id, fuma, alcohol, alcohol_frecuencia, drogas, tatuajes) VALUES ($1, $2, $3, $4, $5, $6)`;
    const params =[
        vicios.candidato_id, 
        vicios.fuma, 
        vicios.alcohol, 
        vicios.alcohol_frecuencia, 
        vicios.drogas, 
        vicios.tatuajes
    ]
    await queryDb(query, params);
}

const insertMobilidad = async (mobilidad: Mobilidad) => {
    const query = `INSERT INTO mobilidad (candidato_id, licencia, licencia_tipo, licencia_fecha_expiracion, tiempo_conduciendo, vehiculo, vehiculo_tipo, vehiculo_modelo, viaje_interior, viaje_exterior) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;
    const params =[
        mobilidad.candidato_id, 
        mobilidad.licencia, 
        mobilidad.licencia_tipo, 
        mobilidad.licencia_fecha_expiracion, 
        mobilidad.tiempo_conduciendo, 
        mobilidad.vehiculo, 
        mobilidad.vehiculo_tipo, 
        mobilidad.vehiculo_modelo, 
        mobilidad.viaje_interior, 
        mobilidad.viaje_exterior
    ]
    await queryDb(query, params);
}

const insertContactos = async (contactos: Contacto[]) => {
    const query = `INSERT INTO contactos (id, candidato_id, parentezco, nombre, trabajo, telefono) VALUES ($1, $2, $3, $4, $5, $6)`;
    for (const contacto of contactos) {
        const params = [
            contacto.id, 
            contacto.candidato_id, 
            contacto.parentezco, 
            contacto.nombre, 
            contacto.trabajo, 
            contacto.telefono
        ]
        await queryDb(query, params);
    }
}

const insertEstudios = async (estudios: Estudio[]) => {
    const query = `INSERT INTO estudios (id, candidato_id, institucion, titulo, grado) VALUES ($1, $2, $3, $4, $5)`;
    for (const estudio of estudios) {
        const params = [
            estudio.id, 
            estudio.candidato_id, 
            estudio.institucion, 
            estudio.titulo, 
            estudio.grado
        ]
        await queryDb(query, params);
    }
}

const insertExperienciaLaboral = async (experienciaLaboral: ExperienciaLaboral[]) => {
    const query = `INSERT INTO experiencia_laboral (id, candidato_id, empresa, puesto, fecha_inicio, fecha_fin, telefono_empresa, direccion_empresa, jefe_nombre, jefe_telefono, salario, motivo_salida, responsabilidades) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`;
    for (const trabajo of experienciaLaboral) {
        const params = [
            trabajo.id, 
            trabajo.candidato_id, 
            trabajo.empresa, 
            trabajo.puesto, 
            trabajo.fecha_inicio, 
            trabajo.fecha_fin, 
            trabajo.telefono_empresa, 
            trabajo.direccion_empresa, 
            trabajo.jefe_nombre, 
            trabajo.jefe_telefono, 
            trabajo.salario, 
            trabajo.motivo_salida, 
            trabajo.responsabilidades
        ]
        await queryDb(query, params);
    }
}

export const clearTables = async () => {
    try {
        console.log('Dropping tables...');

        // Drop tables in reverse dependency order to avoid foreign key conflicts
        await queryDb('DROP TABLE IF EXISTS contactos');
        await queryDb('DROP TABLE IF EXISTS estudios');
        await queryDb('DROP TABLE IF EXISTS experiencia_laboral');
        await queryDb('DROP TABLE IF EXISTS informacion_personal');
        await queryDb('DROP TABLE IF EXISTS residencia');
        await queryDb('DROP TABLE IF EXISTS vicios');
        await queryDb('DROP TABLE IF EXISTS mobilidad');
        await queryDb('DROP TABLE IF EXISTS candidatos');

        console.log('Recreating tables...');

        // Create candidatos table
        await queryDb(`
            CREATE TABLE candidatos (
                candidato_id VARCHAR(255) PRIMARY KEY,
                timestamp VARCHAR(255) NOT NULL,
                nombre VARCHAR(255) NOT NULL,
                puesto_aplicado VARCHAR(255),
                como_se_entero VARCHAR(255),
                genero VARCHAR(255),
                telefono_whatsapp VARCHAR(255),
                telefono VARCHAR(255),
                correo VARCHAR(255),
                aspiracion_salarial VARCHAR(255),
                comentarios TEXT
            )
        `);

        // Create informacion_personal table
        await queryDb(`
            CREATE TABLE informacion_personal (
                candidato_id VARCHAR(255) PRIMARY KEY,
                dpi VARCHAR(255),
                fecha_nacimiento VARCHAR(255),
                edad VARCHAR(255),
                nacionalidad VARCHAR(255),
                estado_civil VARCHAR(255),
                personas_dependientes VARCHAR(255),
                religion VARCHAR(255),
                software TEXT,
                partido_politico VARCHAR(255),
                sindicato VARCHAR(255),
                adjetivos TEXT,
                impedimento_fisico TEXT,
                enfermedad TEXT,
                nivel_estudios VARCHAR(255),
                estudios_adicionales TEXT,
                idiomas VARCHAR(255),
                FOREIGN KEY (candidato_id) REFERENCES candidatos(candidato_id)
            )
        `);

        // Create residencia table
        await queryDb(`
            CREATE TABLE residencia (
                candidato_id VARCHAR(255) PRIMARY KEY,
                vive_con VARCHAR(255),
                calle VARCHAR(255),
                zona VARCHAR(255),
                municipio VARCHAR(255),
                departamento VARCHAR(255),
                pais_de_residencia VARCHAR(255),
                FOREIGN KEY (candidato_id) REFERENCES candidatos(candidato_id)
            )
        `);

        // Create vicios table
        await queryDb(`
            CREATE TABLE vicios (
                candidato_id VARCHAR(255) PRIMARY KEY,
                fuma VARCHAR(50),
                alcohol VARCHAR(50),
                alcohol_frecuencia VARCHAR(255),
                drogas VARCHAR(50),
                tatuajes VARCHAR(50),
                FOREIGN KEY (candidato_id) REFERENCES candidatos(candidato_id)
            )
        `);

        // Create mobilidad table
        await queryDb(`
            CREATE TABLE mobilidad (
                candidato_id VARCHAR(255) PRIMARY KEY,
                licencia VARCHAR(50),
                licencia_tipo VARCHAR(255),
                licencia_fecha_expiracion VARCHAR(255),
                tiempo_conduciendo VARCHAR(255),
                vehiculo VARCHAR(255),
                vehiculo_tipo TEXT,
                vehiculo_modelo TEXT,
                viaje_interior VARCHAR(255),
                viaje_exterior VARCHAR(255),
                FOREIGN KEY (candidato_id) REFERENCES candidatos(candidato_id)
            )
        `);

        // Create contactos table
        await queryDb(`
            CREATE TABLE contactos (
                id VARCHAR(255) PRIMARY KEY,
                candidato_id VARCHAR(255),
                parentezco VARCHAR(50),
                nombre VARCHAR(255),
                trabajo VARCHAR(255),
                telefono VARCHAR(255),
                FOREIGN KEY (candidato_id) REFERENCES candidatos(candidato_id)
            )
        `);

        // Create estudios table
        await queryDb(`
            CREATE TABLE estudios (
                id VARCHAR(255) PRIMARY KEY,
                candidato_id VARCHAR(255),
                institucion VARCHAR(255),
                titulo VARCHAR(255),
                grado VARCHAR(255),
                FOREIGN KEY (candidato_id) REFERENCES candidatos(candidato_id)
            )
        `);

        // Create experiencia_laboral table
        await queryDb(`
            CREATE TABLE experiencia_laboral (
                id VARCHAR(36) PRIMARY KEY,
                candidato_id VARCHAR(36),
                empresa VARCHAR(255),
                puesto TEXT,
                fecha_inicio VARCHAR(255),
                fecha_fin VARCHAR(255),
                telefono_empresa VARCHAR(255),
                direccion_empresa TEXT,
                jefe_nombre VARCHAR(255),
                jefe_telefono VARCHAR(255),
                salario VARCHAR(255),
                motivo_salida TEXT,
                responsabilidades TEXT,
                FOREIGN KEY (candidato_id) REFERENCES candidatos(candidato_id)
            )
        `);

        console.log('All tables have been recreated successfully.');
    } catch (error) {
        console.error('Error dropping and recreating tables:', error);
        throw error;
    }
};

export const processCandidateData = async (data:any) => {

    const candidate = createNewCandidate(data);

    const informacionPersonal = createInformacionPersonal(candidate.candidato_id, data);
    const residencia = createResidencia(candidate.candidato_id, data);
    const vicios = createVicios(candidate.candidato_id, data);
    const mobilidad = createMobilidad(candidate.candidato_id, data);
    const contactos = createContactos(candidate.candidato_id, data);
    const estudios = createEstudios(candidate.candidato_id, data);
    const experienciaLaboral = createExperienciaLaboral(candidate.candidato_id, data);

    await insertCandidate(candidate);
    await insertInformacionPersonal(informacionPersonal);
    await insertResidencia(residencia);
    await insertVicios(vicios);
    await insertMobilidad(mobilidad);
    await insertContactos(contactos);
    await insertEstudios(estudios);
    await insertExperienciaLaboral(experienciaLaboral);

}