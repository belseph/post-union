import "./About.css";

const About = () => {

    return (
        <main className="about-container">
            <div className="about-page">
                <h1>Sobre Nosotros</h1>
                <p>
                    En <strong>SkillLink</strong>, somos una plataforma de ideas enfocada en potenciar emprendimientos desde su etapa más temprana. Nuestro objetivo es brindar un espacio donde las ideas puedan evolucionar y convertirse en proyectos viables.
                </p>
                <h2>Enfoque</h2>
                <ul>
                    <li>Incubadora de ideas innovadoras.</li>
                    <li>Mentorías para emprendedores en diferentes etapas.</li>
                    <li>Validación de MVPs (productos mínimos viables).</li>
                </ul>
                <h2>¿Qué incluye nuestro programa?</h2>
                <ul>
                    <li>Formación de equipos en torno a ideas de negocio.</li>
                    <li>Mentorías especializadas en desarrollo y estrategia de negocios.</li>
                    <li>Sesiones de feedback con inversores simulados para preparar tu pitch.</li>
                </ul>
                <p>
                    Creemos en el poder del talento colaborativo y en la importancia de acompañar a quienes están dando sus primeros pasos como fundadores.
                </p>
            </div>
        </main>
    );
};

export default About;
