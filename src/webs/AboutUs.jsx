import TopHeader from "../components/TopHeader.jsx";
import Footer from "../components/Footer.jsx";

const AboutUs = () => {
    return (
        <>
            <div className="bg-image d-flex flex-column justify-content-between">
                <TopHeader />
                <div className="container mt-4">
                    <h2 className="roboto-bold text-center m-4">SOBRE NOSOTROS</h2>
                    <div className="row align-items-start">
                        <div className="col-md-6 d-flex justify-content-center">
                            <div className="embed-responsive embed-responsive-16by9" style={{ width: '80%', height: 'auto' }}>
                                <iframe
                                    className="embed-responsive-item"
                                    src="https://www.youtube.com/embed/8Qu3_T7AH2M"
                                    title="Comunidad Underc0de"
                                    allowFullScreen
                                    style={{ width: '100%', height: '300px' }}
                                ></iframe>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <h5 className="mb-3 roboto-bold">Sobre la Fundación Underc0de:</h5>
                            <p className="roboto-light">
                                La Fundación Underc0de es una organización dedicada a la promoción de la educación en tecnología y el desarrollo de habilidades digitales en jóvenes y adultos. Desde su creación, nuestro objetivo ha sido empoderar a las personas a través del conocimiento, fomentando un ambiente de aprendizaje inclusivo y accesible para todos.
                            </p>
                            <h5 className="roboto-bold">Objetivos de la Fundación:</h5>
                            <p className="roboto-light">
                                <strong>Educación y Capacitación:</strong> Ofrecemos cursos, talleres y conferencias en diversas áreas de la tecnología, incluyendo programación, diseño web, ciberseguridad y desarrollo de videojuegos. Nuestro objetivo es equipar a nuestros estudiantes con las habilidades necesarias para prosperar en el mundo digital.
                            </p>
                        </div>

                        <div className="col-md-12">
                            <hr />
                            <p className="roboto-light">
                                <strong>Fomento de la Comunidad:</strong> Creemos en el poder de la comunidad. A través de eventos, meetups y colaboraciones, buscamos crear una red de apoyo donde los miembros puedan compartir experiencias, conocimientos y oportunidades laborales.
                            </p>
                            <p className="roboto-light">
                                <strong>Acceso a Oportunidades:</strong> Trabajamos para eliminar barreras en el acceso a la educación tecnológica. Ofrecemos becas y programas de apoyo para aquellos que lo necesiten, asegurando que todos tengan la oportunidad de aprender y crecer.
                            </p>
                            <h5 className="roboto-bold">Carisma de Nuestra Comunidad:</h5>
                            <p className="roboto-light">
                                La comunidad de la Fundación Underc0de se caracteriza por su entusiasmo, curiosidad y deseo de aprender. Nuestros miembros son personas de diversos orígenes que comparten una pasión común por la tecnología y la innovación. Juntos, fomentamos un ambiente colaborativo donde todos se sienten bienvenidos y motivados a explorar nuevas ideas y proyectos. Nos enorgullece ver cómo nuestra comunidad se apoya mutuamente, celebrando los logros individuales y colectivos.
                            </p>
                            <p className="roboto-light">
                                En la Fundación Underc0de, creemos que la educación es la clave para un futuro mejor y estamos comprometidos a ser un catalizador para el cambio positivo en la vida de las personas a través de la tecnología.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-center mt-4">
                    <img
                        src="../logoUnderc0de.png"
                        alt="Logo de Underc0de"
                        style={{ width: '120px', height: '120px' }}
                        className="mb-4"
                    />
                </div>
                <Footer className="position-relative" />
            </div>
        </>
    );
};

export default AboutUs;
