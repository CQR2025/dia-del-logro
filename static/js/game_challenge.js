document.addEventListener('DOMContentLoaded', function () {
    const challengeText = document.getElementById('challenge-text');
    const feedbackText = document.getElementById('feedback-text');
    const quizContainer = document.getElementById('quiz-container');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const novaSpeech = document.getElementById('nova-speech');
    const mainGameContainer = document.querySelector('.d-flex.flex-column.justify-content-center.align-items-center.vh-100.bg-white.text-center.overflow-y-auto');

    let currentQuestion = null; // Almacenará la pregunta actual seleccionada aleatoriamente

    const allQuestions = [
        {
            question: "¿Cuál es para nosotros un pilar fundamental en el enfoque educativo?",
            options: [
                "Énfasis en la memorización y repetición sin sentido.",
                "Fomento del pensamiento crítico y la autonomía.",
                "Enseñanza autoritaria sin participación del alumno."
            ],
            correctAnswer: 1 // Índice de la opción correcta (0-based)
        },
        {
            question: "¿Qué metodología pedagógica utilizamos para el desarrollo de competencias?",
            options: [
                "Proyectos de aprendizaje STEAM.",
                "Únicamente el método tradicional de enseñanza.",
                "Ninguna metodología específica, solo un enfoque general."
            ],
            correctAnswer: 0
        },
        {
            question: "¿Qué logramos mediante el aprendizaje basado en proyectos de aprendizaje STEAM?",
            options: [
                "Resolver ejercicios repetitivos en silencio.",
                "Investigar, crear, y aplicar conocimientos en situaciones reales.",
                "Memorizar datos para una prueba.",
            ],
            correctAnswer: 1
        },
        {
            question: "¿Para qué examen internacional nos preparamos?",
            options: [
                "Exámenes de certificación Cambridge.",
                "Exámenes de aptitud deportiva.",
                "Exámenes de música y arte."
            ],

            correctAnswer: 0
        }
    ];

    // Función para mezclar un array (Fisher-Yates shuffle)
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function initializeGame() {
        console.log("Initializing game...");
        currentQuestion = null;
        quizContainer.style.display = 'block'; // Mostrar el contenedor del cuestionario directamente
        feedbackText.style.display = 'none';
        novaSpeech.style.display = 'none'; // Asegurarse de que el mensaje de nova esté oculto al inicio
        
        displayQuestion(); // Mostrar la primera pregunta
        console.log("Game initialized. Question displayed.");
    }

    // Función para mostrar la pregunta actual
    function displayQuestion() {
        console.log("Displaying question...");
        // Seleccionar una pregunta aleatoria de todas las preguntas disponibles
        const randomIndex = Math.floor(Math.random() * allQuestions.length);
        currentQuestion = allQuestions[randomIndex];

        questionText.textContent = currentQuestion.question;
        optionsContainer.innerHTML = ''; // Limpiar opciones anteriores

        // Mezclar las opciones para la pregunta actual
        const shuffledOptions = [...currentQuestion.options];
        shuffleArray(shuffledOptions);

        shuffledOptions.forEach((option, index) => {
            const button = document.createElement('button');
            button.classList.add('btn', 'btn-outline-secondary', 'mb-2', 'w-100');
            button.textContent = option;
            // Guardar el índice original de la respuesta correcta para la verificación
            if (option === currentQuestion.options[currentQuestion.correctAnswer]) {
                button.dataset.correct = 'true';
            }
            button.addEventListener('click', (event) => {
                // Deseleccionar todas las opciones
                Array.from(optionsContainer.children).forEach(btn => {
                    btn.classList.remove('active');
                });
                // Seleccionar la opción actual
                event.target.classList.add('active');
                
                // Lógica de verificación y redirección/reinicio aquí
                const selectedOption = event.target;
                if (selectedOption.dataset.correct === 'true') {
                    // Ocultar feedbackText y mostrar novaSpeech
                    feedbackText.style.display = 'none';
                    novaSpeech.textContent = '¡Felicidades, es correcto! Ahora conoceremos qué es MONTESSORI LEARNING FEST.';
                    novaSpeech.style.display = 'block';
                    novaSpeech.style.color = 'green'; // Opcional: color para el mensaje de nova

                    // Deshabilitar botones para evitar múltiples clics
                    Array.from(optionsContainer.children).forEach(btn => btn.disabled = true);
                    
                    setTimeout(() => {
                        // Aplicar efecto de desvanecimiento después de 1.5 segundos
                        if (mainGameContainer) {
                            mainGameContainer.classList.add('fade-out-effect');
                        }
                        setTimeout(() => {
                            window.location.href = '/festival'; // Redirigir después de la animación
                        }, 350); // Duración de la animación de desvanecimiento
                    }, 1500); // Mostrar mensaje de nova por 1.5 segundos
                } else {
                    // Ocultar feedbackText y mostrar novaSpeech para respuesta incorrecta
                    feedbackText.style.display = 'none';
                    const correctAnswerButton = optionsContainer.querySelector('[data-correct="true"]');
                    novaSpeech.textContent = 'Incorrecto. La respuesta correcta era: ' + correctAnswerButton.textContent + '. ¡Inténtalo de nuevo!';
                    novaSpeech.style.color = 'red';
                    novaSpeech.style.display = 'block';

                    // Deshabilitar botones para evitar múltiples clics
                    Array.from(optionsContainer.children).forEach(btn => btn.disabled = true);
                    setTimeout(() => {
                        initializeGame(); // Reiniciar el juego
                    }, 3000); // Reiniciar después de 3 segundos
                }
            });
            optionsContainer.appendChild(button);
        });
        console.log("Question and options populated.");
    }

    // Inicializar el juego al cargar la página
    initializeGame();
});